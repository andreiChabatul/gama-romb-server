import { chatGame } from "../chatGame";
import { AuctionI, RoomI, cells, fullPlayer, gameRoom, infoRoom, playersGame } from "src/types";
import { PlayerDefault } from "../player/player";
import { AuctionCompany } from "../auction.service";
import { TurnService } from "../turn.service";
import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, StateGamePayload } from "src/types/websocket";
import { Prison } from "../prison";
import { OfferService } from "../offer.service";
import { UserService } from "src/user/user.service";
import { cellsGame } from "../cells";
import { defaultCell } from "../cells/defaultCell";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { CreateRoomDto } from "src/rooms/dto/create.room.dto";
import { PrisonI } from "src/types/player";

export class RoomGame implements RoomI {

    private players: playersGame = {};
    private cellsGame: cells[];
    private auction: AuctionI;
    private turnService: TurnService;
    private prison: PrisonI;
    private offerService: OfferService;
    private infoRoom: CreateRoomDto;
    private isStart: boolean;

    constructor(createRoomDto: CreateRoomDto, private idRoom: string, private userService: UserService) {
        this.infoRoom = createRoomDto;
        this.auction = new AuctionCompany(idRoom, this.players);
        this.prison = new Prison(idRoom, this.turnService);
        this.cellsGame = cellsGame(idRoom, this.auction, this.players, this.prison);
        this.offerService = new OfferService(idRoom, this.players, this.cellsGame);
        this.turnService = new TurnService(idRoom, this.players, this.cellsGame);
    }

    addPlayer(id: string, color: string): void {
        this.players[id] = new PlayerDefault(id, this.idRoom, color, this.cellsGame);
        this.checkStartGame();
    }

    deletePlayer(idUser: string): void {
        delete this.players[idUser];
    }

    oflinePlayer(idUser: string): void {
        this.players[idUser].online = false;
    }

    private async checkStartGame(): Promise<void> {
        if (this.amountPlayers === Number(this.infoRoom.maxPlayers) && this.amountPlayers > 0) { //убрать труе потом, временно чтобы тестть
            this.isStart = true;
            storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.START_GAME, await this.gameInfo());
            this.turnService.firstTurn();
        };
    }

    playerMove({ idUser, isDouble, value }: DiceRollGamePayload): void {
        this.players[idUser].prison
            ? this.prison.turnPrison(this.players[idUser], value, isDouble)
            : this.turnService.turn(this.players[idUser], value, isDouble);
    }

    activeCell(idUser: string): void {
        const indexCell = this.players[idUser].position;
        if (this.cellsGame[indexCell]) {
            this.cellsGame[indexCell].activateCell();
        };
        this.turnService.endTurn();
    }

    controlCompany({ action, idUser, indexCompany }: ContorolCompanyPayload): void {
        const cell = this.cellsGame[indexCompany];
        ('controlCompany' in cell) ? cell.controlCompany(action, this.players[idUser]) : '';
    };

    controlAuction({ idUser, action }: ControlAuctionPayload): void {
        switch (action) {
            case 'startAuction':
                const cellId = this.players[idUser].position;
                const cell = this.cellsGame[cellId];
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
                this.players = {};
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
        const playersPrisma = await this.userService.findMany(Object.keys(this.players));
        const players = playersPrisma.map((player) => {
            return { ...player, ...this.players[player.id].playerInfo }
        });
        return players;
    }

    disconnectPlayer(idUser: string): void {
        this.isStart ? this.leavePlayerGame(idUser) : this.deletePlayer(idUser);
    }

    async reconnectPlayer(idUser: string): Promise<void> {
        this.players[idUser].online = true;
        storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.START_GAME, await this.gameInfo());
        this.cellsGame.forEach((cell) => ('controlCompany' in cell) ? cell.sendInfoPLayer(idUser) : '');
        this.turnService.updateTurn(idUser);
    }

    private leavePlayerGame(idUser: string): void {
        storage_WS.leavePlayerGame(this.idRoom, idUser);
        this.players[idUser].bankrupt = true;
        this.players[idUser].online = false;
        this.activeCell(idUser);
        this.turnService.updateTurn();
    }

    get amountPlayers(): number {
        return Object.keys(this.players).length;
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
