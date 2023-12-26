import { chatGame } from "../chatGame";
import { AuctionI, RoomI, fullPlayer, gameRoom, infoRoom } from "src/types";
import { PlayerDefault } from "../player/player";
import { AuctionCompany } from "../auction.service";
import { TurnService } from "../turn.service";
import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, StateGamePayload } from "src/types/websocket";
import { Prison } from "../prison";
import { OfferService } from "../offer.service";
import { UserService } from "src/user/user.service";
import { CellsService } from "../cells";
import { defaultCell } from "../cells/defaultCell";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { CreateRoomDto } from "src/rooms/dto/create.room.dto";
import { PrisonI } from "src/types/player";
import { CellsServiceI } from "src/types/cellsServices";
import { storage_players } from "../playerStorage";

export class RoomGame implements RoomI {

    private auction: AuctionI;
    private turnService: TurnService;
    private cellsService: CellsServiceI;
    private prison: PrisonI;
    private offerService: OfferService;
    private infoRoom: CreateRoomDto;
    private isStart: boolean;

    constructor(createRoomDto: CreateRoomDto, private idRoom: string, private userService: UserService) {
        this.infoRoom = createRoomDto;
        this.auction = new AuctionCompany(idRoom);
        this.turnService = new TurnService(idRoom);
        this.prison = new Prison(idRoom, this.turnService);
        this.cellsService = new CellsService(idRoom, this.auction, this.prison);
        this.offerService = new OfferService(idRoom, this.cellsService);
    }

    addPlayer(idUser: string, color: string): void {
        const player = new PlayerDefault(idUser, this.idRoom, color, this.cellsService.getAllCells());
        storage_players.addPlayer(this.idRoom, idUser, player);
        this.checkStartGame();
    }

    private async checkStartGame(): Promise<void> {
        const amountPlayers = storage_players.getAmountPlayers(this.idRoom);
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
                this.prison.deletePrisoner(player);
            } else {
                this.prison.turnPrison(player);
                return;
            }
        };
        player.position = value;
        const cell = this.cellsService.getOneCell(player.position);
        this.turnService.turn(idUser, value, isDouble, cell);
    }

    activeCell(idUser: string): void {
        const indexCell = storage_players.getPlayer(this.idRoom, idUser).position;
        this.cellsService.activateCell(indexCell, idUser);
        this.turnService.endTurn();
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
                chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.START_AUCTION, cellId });
                break;
            case "leaveAuction":
                this.auction.leaveAuction(idUser);
                chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.LEAVE_AUCTION, idUser });
                break;
            case "stepAuction":
                this.auction.stepAuction(idUser);
                chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.STEP_AUCTION, idUser });
                break;
            case "endAuction":
                this.turnService.updateTurn();
                chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.END_AUCTION });
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

    disconnectPlayer(idUser: string): void {
        this.isStart
            ? this.leavePlayerGame(idUser)
            : storage_players.deletePlayer(this.idRoom, idUser);
    }

    async reconnectPlayer(idUser: string): Promise<void> {
        const player = storage_players.getPlayer(this.idRoom, idUser);
        player.online = true;
        storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.START_GAME, await this.gameInfo());
        this.cellsService.reconnectPlayer(idUser);
        this.turnService.updateTurn(idUser);
    }

    private leavePlayerGame(idUser: string): void {
        const player = storage_players.getPlayer(this.idRoom, idUser);
        storage_WS.leavePlayerGame(this.idRoom, idUser);
        player.bankrupt = true;
        player.online = false;
        this.activeCell(idUser);
        this.turnService.updateTurn();
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
