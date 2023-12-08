import { Chat } from "../chatGame";
import { AuctionI, PrisonI, RoomI, cells, fullPlayer, gameCell, gameRoom, infoRoom, playersGame } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "../player/player";
import { CellCompany } from "../cells/cell.company";
import { defaultCell } from "../cells/defaultCell";
import { AuctionCompany } from "../auction.service";
import { TurnService } from "../turn.service";
import { CellEmpty } from "../cells/cell.empty";
import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, EACTION_WEBSOCKET, EndGamePayload, MessageChatGamePayload, OfferDealPayload, Room_WS, gameCreate } from "src/types/websocket";
import { ROOM_WS } from "../roomWS";
import { Prison } from "../prison";
import { OfferService } from "../offer.service";
import { CellTax } from "../cells/cell.tax";
import { CellProfit } from "../cells/cell.profit";
import { CellLoss } from "../cells/cell.loss";
import { EMESSAGE_CLIENT } from "src/const/enum";
import { TIME_DISCONNECT } from "src/const";
import { emptyPlayer } from "../player/empty.player";
import { UserService } from "src/user/user.service";

export class RoomGame implements RoomI {

    players: playersGame = {};
    private cellsGame: cells[] = [];
    private chat: Chat;
    private auction: AuctionI;
    private turnService: TurnService;
    private prison: PrisonI;
    private roomWS: Room_WS;
    private offerService: OfferService;
    private infoRoom: gameCreate;

    constructor(gameCreateDto: gameCreate, private idRoom: string, private userService: UserService) {
        this.infoRoom = gameCreateDto;
        this.roomWS = new ROOM_WS();
        this.chat = new Chat(this.roomWS);
        this.turnService = new TurnService(this.roomWS, this.players, this.cellsGame, this.chat);
        this.auction = new AuctionCompany(this.players, this.roomWS);
        this.prison = new Prison(this.turnService, this.chat);
        this.offerService = new OfferService(this.players, this.roomWS, this.cellsGame);
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
            const payload: gameRoom = {
                idRoom: this.idRoom,
                players: (await this.fillPlayers()).reduce((res, curr) => {
                    res[curr.id] = curr;
                    return res;
                }, {}),
                board: this.fillCellsGame(),
                chat: [],
                turnId: '',
                timeTurn: this.infoRoom.timeTurn
            };
            this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.START_GAME, payload);
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
        this.cellsGame[indexCell].activateCell();
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

    endGame({ idUser, action }: EndGamePayload): void {
        switch (action) {
            case 'leave':
                this.roomWS.leavePlayer(idUser);
                this.players[idUser].bankrupt = true;
                this.activeCell(idUser);
                delete this.players[idUser];
                this.turnService.updateTurn();
                break;
            case "stay":
                this.turnService.endTurn();
            case "endGame":
                this.players = {};
                break;
            case "endTime":
                this.roomWS.leavePlayer(idUser);
                this.players[idUser].bankrupt = true;
                this.activeCell(idUser);
                delete this.players[idUser];
                this.turnService.updateTurn();
                break;
            default:
                break;
        }

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
            return { ...emptyPlayer, ...player, color: this.players[player.id].color }
        });
        return players;
    }

    disconnectPlayer(idUser: string): void {
        if (this.players[idUser]) {
            this.players[idUser].online = false;
            setTimeout(() =>
                this.endGame({ idUser, action: "leave", idRoom: '' })
                , TIME_DISCONNECT)
        }
    }

    get amountPlayers(): number {
        return Object.keys(this.players).length;
    }

    private fillCellsGame(): gameCell[] {
        const infoCell: gameCell[] = [];
        defaultCell.map((cell, indexCell) => {
            infoCell[indexCell] = { indexCell, ...cell };

            switch (cell.type) {
                case "company":
                    const newCellCompany = new CellCompany(this.roomWS, cell.company, this.auction, this.players, indexCell);
                    this.cellsGame[indexCell] = newCellCompany;
                    infoCell[indexCell].company = { ...infoCell[indexCell].company, ...newCellCompany.info }
                    break;
                case "empty":
                    this.cellsGame[indexCell] = new CellEmpty(indexCell, cell.nameCell, this.roomWS, this.prison);
                    break;
                case "tax":
                    this.cellsGame[indexCell] = new CellTax(indexCell, cell.nameCell, this.roomWS);
                    break;
                case "profit":
                    this.cellsGame[indexCell] = new CellProfit(indexCell, this.roomWS);
                    break;
                case "loss":
                    this.cellsGame[indexCell] = new CellLoss(indexCell, this.roomWS);
                    break;
            }
        });
        return infoCell;
    }
}
