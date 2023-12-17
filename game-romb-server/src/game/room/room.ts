import { Chat } from "../chatGame";
import { AuctionI, PlayerDefaultI, PrisonI, RoomI, cells, fullPlayer, gameRoom, infoRoom, playersGame } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "../player/player";
import { AuctionCompany } from "../auction.service";
import { TurnService } from "../turn.service";
import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, Room_WS, StateGamePayload, gameCreate } from "src/types/websocket";
import { ROOM_WS } from "../roomWS";
import { Prison } from "../prison";
import { OfferService } from "../offer.service";
import { EMESSAGE_CLIENT } from "src/const/enum";
import { UserService } from "src/user/user.service";
import { cellsGame } from "../cells";
import { defaultCell } from "../cells/defaultCell";

export class RoomGame implements RoomI {

    private players: playersGame = {};
    private cellsGame: cells[];
    private chat: Chat;
    private auction: AuctionI;
    private turnService: TurnService;
    private prison: PrisonI;
    private roomWS: Room_WS;
    private offerService: OfferService;
    private infoRoom: gameCreate;
    private isStart: boolean;

    constructor(gameCreateDto: gameCreate, private idRoom: string, private userService: UserService) {
        this.infoRoom = gameCreateDto;
        this.roomWS = new ROOM_WS();
        this.chat = new Chat(this.roomWS);
        this.auction = new AuctionCompany(this.players, this.roomWS);
        this.prison = new Prison(this.turnService, this.chat);
        this.cellsGame = cellsGame(this.roomWS, this.auction, this.players, this.prison);
        this.offerService = new OfferService(this.players, this.roomWS, this.cellsGame);
        this.turnService = new TurnService(this.roomWS, this.players, this.cellsGame, this.chat);
    }

    addPlayer(id: string, color: string, client: WebSocket): void {
        this.roomWS.addWebSocket(id, client);
        this.players[id] = new PlayerDefault(id, color, this.roomWS, this.chat, this.cellsGame);
        this.checkStartGame();
    }

    deletePlayer(idUser: string): void {
        delete this.players[idUser];
    }

    private async checkStartGame(): Promise<void> {
        if (this.amountPlayers === Number(this.infoRoom.maxPlayers)) { //убрать труе потом, временно чтобы тестть
            this.isStart = true;
            this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.START_GAME, await this.startGameInfo());
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
                this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.START_AUCTION, cellId });
                break;
            case "leaveAuction":
                this.auction.leaveAuction(idUser);
                this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.LEAVE_AUCTION, idUser });
                break;
            case "stepAuction":
                this.auction.stepAuction(idUser);
                this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.STEP_AUCTION, idUser });
                break;
            case "endAuction":
                this.turnService.updateTurn();
                this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.END_AUCTION });
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
                this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.REFUSE_DEAL, idUser });
                this.turnService.updateTurn();
                break;
            case "accept":
                this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.ACCEPT_DEAL, idUser });
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

    addChatMessage({ message, idUser }: MessageChatGamePayload): void {
        this.chat.addMessage(message, idUser);
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
            return { ...player, ...this.players[player.id].player }
        });
        return players;
    }

    disconnectPlayer(idUser: string): void {
        this.isStart ? this.leavePlayerGame(idUser) : this.deletePlayer(idUser);
    }

    async reconnectPlayer(idUser: string, client: WebSocket): Promise<void> {
        this.players[idUser].online = true;
        this.roomWS.addWebSocket(idUser, client);
        this.roomWS.sendOnePlayer(idUser, EACTION_WEBSOCKET.RECONNECT);
    }

    private leavePlayerGame(idUser: string): void {
        this.roomWS.leavePlayer(idUser);
        this.players[idUser].bankrupt = true;
        this.players[idUser].online = false;
        this.activeCell(idUser);
        this.turnService.updateTurn();
    }

    get amountPlayers(): number {
        return Object.keys(this.players).length;
    }

    getPlayer(idUser: string): PlayerDefaultI | undefined {
        return this.players[idUser].bankrupt ? undefined : this.players[idUser];
    }

    private async startGameInfo(): Promise<gameRoom> {
        return {
            idRoom: this.idRoom,
            players: (await this.fillPlayers()).reduce((res, curr) => {
                res[curr.id] = curr;
                return res;
            }, {}),
            board: defaultCell,
            chat: this.chat.messages,
            turnId: '',
            timeTurn: this.infoRoom.timeTurn
        };
    }
}
