import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chatGame";
import { PlayersGame, PrisonI, RoomClass, cells, controlCompany, gameCell } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { AuctionCompany } from "./auctionCompany";
import { CellProfitLoss } from "./cells/cell.profit.loss";
import { TurnService } from "./turn.service";
import { CellEmpty } from "./cells/cell.empty";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { ROOM_WS } from "./roomWS";
import { COLORS_PLAYER, DEBT_PRISON } from "src/app/const";
import { Prison } from "./prison";

export class Room implements RoomClass {

    playerCount: number;
    isVisiblity: boolean;
    roomName: string;
    numberPlayer: number;
    players: PlayersGame = {};
    private cellsGame: cells[] = [];
    private chat: Chat;
    private auction: AuctionCompany;
    private turnService: TurnService;
    private prison: PrisonI;
    private roomWS: Room_WS;

    constructor(gameCreateDto: GameCreateDto, private idRoom: string) {
        this.roomName = gameCreateDto.roomName;
        this.playerCount = gameCreateDto.players;
        this.numberPlayer = 0;
        this.roomWS = new ROOM_WS();
        this.chat = new Chat(this.roomWS);
        this.turnService = new TurnService(this.roomWS, this.players, this.cellsGame, this.chat);
        this.auction = new AuctionCompany(this.players, this.roomWS, this.chat, this.turnService);
        this.prison = new Prison(this.turnService, this.roomWS);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
    }

    addPlayer(id: string, client: WebSocket) {
        this.roomWS.addWebSocket(id, client);
        this.players[id] = new PlayerDefault(this.roomWS, id, COLORS_PLAYER[this.numberPlayer], this.chat);
        this.numberPlayer++;
        this.checkStartGame();
        this.fillCellsGame();

        Object.values(this.players).forEach((player) => {
            this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INIT_PLAYER, player.player);
        })//перенести в старт game
    }

    private checkStartGame() {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.START_GAME, { idRoom: this.idRoom });
        this.turnService.firstTurn();
    }

    playerMove(idUser: string, value: number, isDouble: boolean) {
        this.players[idUser].prison
            ? this.prison.turnPrison(this.players[idUser], value, isDouble)
            : this.turnService.turn(this.players[idUser], value, isDouble)
    }

    playerPayDebt(idUser: string, debtValue: number, receiverId?: string) {
        const player = this.players[idUser]
        if (player.prison) {
            player.payDebt(DEBT_PRISON);
            this.prison.deletePrisoner(player);
        } else {
            (receiverId)
            ? player.payRentCompany(debtValue, this.players[receiverId])
            : player.payDebt(debtValue);
        }
        this.turnService.endTurn();
    }

    controlCompany(idUser: string, indexCompany: number, action: controlCompany) {
        const company = this.cellsGame[indexCompany];
        if ('controlCompany' in company) {
            company.controlCompany(action, this.players[idUser]);
        };
    }

    addChatMessage(message: string, idUser: string): void {
        this.chat.addMessage(message, this.players[idUser]);
    }

    returnInfoRoom() {
        return {
            maxPLayers: this.playerCount,
            idRoom: this.idRoom,
            isVisiblity: this.isVisiblity,
            roomName: this.roomName
        };
    }

    private fillCellsGame() {
        const infoCell: gameCell[] = [];
        defaultCell.map((cell, indexCell) => {
            switch (cell.type) {
                case 'company':
                    const newCellCompany = new CellCompany(this.roomWS, this.chat, cell.company, this.auction, this.turnService, indexCell);
                    this.cellsGame[indexCell] = newCellCompany
                    infoCell[indexCell] = { indexCell, location: cell.location, cellCompany: newCellCompany.info };
                    break;
                case 'lossProfit':
                    const newCellProfit = new CellProfitLoss(this.roomWS, this.chat, this.turnService, cell.change);
                    this.cellsGame[indexCell] = newCellProfit;
                    infoCell[indexCell] = { indexCell, location: cell.location, cellSquare: newCellProfit.info };
                    break;
                case 'empty':
                    const newCellEmpty = new CellEmpty(this.roomWS, this.chat, this.turnService, cell.empty, this.prison);
                    this.cellsGame[indexCell] = newCellEmpty;
                    infoCell[indexCell] = { indexCell, location: cell.location, cellSquare: newCellEmpty.info };
                    break;
                case '':
                    infoCell[indexCell] = { indexCell, location: cell.location }
                    break;
                default:
                    break;
            }
        })
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INIT_BOARD, { board: infoCell })
    }
}
