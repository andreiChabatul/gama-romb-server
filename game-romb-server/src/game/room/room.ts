import { chatGame } from "../chatGame";
import { AuctionI, RoomI, fullPlayer, gameRoom, infoRoom } from "src/types";
import { PlayerDefault } from "../player/player";
import { AuctionCompany } from "../auction.service";
import { TurnService } from "../turn.service";
import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, StateGamePayload } from "src/types/websocket";
import { OfferService } from "../offer.service";
import { UserService } from "src/user/user.service";
import { CellsService } from "../cells";
import { defaultCell } from "../cells/defaultCell";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { CreateRoomDto } from "src/rooms/dto/create.room.dto";
import { CellsServiceI } from "src/types/cellsServices";
import { storage_players } from "../playerStorage";
import { prison } from "../prison.service";

export class RoomGame implements RoomI {

    private auction: AuctionI;
    private turnService: TurnService;
    private cellsService: CellsServiceI;
    private offerService: OfferService;
    private isStart: boolean;

    constructor(private infoRoom: CreateRoomDto, private idRoom: string, private userService: UserService) {
        this.auction = new AuctionCompany(this.idRoom);
        this.turnService = new TurnService(this.idRoom);
        this.cellsService = new CellsService(this.idRoom);
        this.offerService = new OfferService(this.idRoom, this.cellsService);
    }

    addPlayer(idUser: string, color: string): void {
        const player = new PlayerDefault(idUser, this.idRoom, color, this.cellsService);
        storage_players.addPlayer(this.idRoom, idUser, player);
        this.checkStartGame();
    }

    private async checkStartGame(): Promise<void> {
        const amountPlayers = storage_players.getPlayersRoom(this.idRoom).length;
        if (amountPlayers === this.infoRoom.maxPlayers && amountPlayers > 0) { //убрать труе потом, временно чтобы тестть
            this.isStart = true;
            storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.START_GAME, await this.gameInfo());
            this.turnService.firstTurn();
        };
    }

    playerMove({ idUser, isDouble, value }: DiceRollGamePayload): void {
        const player = storage_players.getPlayer(this.idRoom, idUser);
        if (player.prison) {
            if (isDouble) {
                prison.deletePrisoner(this.idRoom, idUser);
            } else {
                prison.turnPrison(this.idRoom, idUser);
                this.turnService.endTurn();
                return;
            }
        };
        player.position = value;
        player.turn = true;
        const cell = this.cellsService.getOneCell(player.position);
        cell.movePlayer(idUser, value);
        this.turnService.turn(idUser, value, isDouble, player.position);
    }

    activeCell(idUser: string): void {
        const player = storage_players.getPlayer(this.idRoom, idUser);
        player.turn ? this.cellsService.activateCell(player.position, idUser) : '';
        this.turnService.endTurn();
        player.turn = false;
    }

    controlCompany({ action, idUser, indexCompany }: ContorolCompanyPayload): void {
        const cell = this.cellsService.getOneCell(indexCompany);
        ('controlCompany' in cell) ? cell.controlCompany(action, idUser) : '';
    };

    controlAuction({ idUser, action }: ControlAuctionPayload): void {
        switch (action) {
            case 'startAuction':
                const cellId = storage_players.getPlayer(this.idRoom, idUser).position;
                const cell = this.cellsService.getOneCell(cellId);
                ('controlCompany' in cell) ? this.auction.startAuction(cell, idUser) : '';
                chatGame.addChatMessage(this.idRoom, { action, cellId });
                break;
            case "leaveAuction":
                this.auction.leaveAuction(idUser);
                chatGame.addChatMessage(this.idRoom, { action, idUser });
                break;
            case "stepAuction":
                this.auction.stepAuction(idUser);
                chatGame.addChatMessage(this.idRoom, { action, idUser });
                break;
            case "endAuction":
                if (this.auction.isAuction) {
                    this.auction.isAuction = false;
                    this.turnService.endTurn();
                    chatGame.addChatMessage(this.idRoom, { action });
                };
                break;
            default:
                break;
        };
    }

    controlDeal({ action, offerDealInfo, idUser }: OfferDealPayload): void {
        switch (action) {
            case 'offer':
                this.offerService.newOffer(offerDealInfo);
                break;
            case "refuse":
                chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.REFUSE_DEAL, idUser });
                this.turnService.updateTurn();
                break;
            case "accept":
                chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.ACCEPT_DEAL, idUser });
                this.offerService.acceptDeal();
                this.turnService.updateTurn();
                break;
            default:
                break;
        };
    }

    stateGame({ idUser, action }: StateGamePayload): void {
        switch (action) {
            case 'leave':
                this.leavePlayerGame(idUser);
                break;
            case "stay":
                this.turnService.endTurn();
            case "endGame":
                storage_players.deleteRoom(this.idRoom);
                storage_WS.deleteRoom(this.idRoom);
                break;
            default:
                break;
        };
    }

    addChatMessage({ idRoom, message, idUser }: MessageChatGamePayload): void {
        chatGame.addChatMessage(idRoom, { message, idUser });
    }

    async returnInfoRoom(): Promise<infoRoom> {
        return {
            ...this.infoRoom,
            idRoom: this.idRoom,
            isStart: this.isStart,
            players: await this.fillPlayers(),
        };
    }

    async fillPlayers(): Promise<fullPlayer[]> {
        const playersIds = storage_players.getPlayersRoom(this.idRoom);
        const playersPrisma = await this.userService.findMany(playersIds);
        const players = playersPrisma.map((player) => {
            return {
                ...player,
                ...storage_players.getPlayer(this.idRoom, player.id).playerInfo
            }
        });
        return players;
    }

    get stateRoom(): boolean {
        return this.isStart;
    }

    async reconnectPlayer(idUser: string): Promise<void> {
        const player = storage_players.getPlayer(this.idRoom, idUser);
        player.online = true;
        storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.START_GAME, await this.gameInfo());
        this.cellsService.reconnectPlayer(idUser);
        this.turnService.updateTurn(idUser);
    }

    leavePlayerGame(idUser: string): void {
        const player = storage_players.getPlayer(this.idRoom, idUser);
        player.bankrupt = true;
        this.activeCell(idUser);
        storage_players.deletePlayer(this.idRoom, idUser);
    }

    private async gameInfo(): Promise<gameRoom> {
        return {
            idRoom: this.idRoom,
            players: (await this.fillPlayers()).reduce((res, curr) => {
                res[curr.id] = curr;
                return res;
            }, {}),
            board: defaultCell,
            chat: chatGame.getAllMessages(this.idRoom),
            turnId: '',
            timeTurn: this.infoRoom.timeTurn
        };
    }
}
