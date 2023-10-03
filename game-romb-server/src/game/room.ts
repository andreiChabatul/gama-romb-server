import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chatGame/chat.room";
import { PlayersGame, RoomClass, cells, gameCell } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { CellCompany } from "./cells/cell.company/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { AuctionCompany } from "./auctionCompany/auctionCompany";
import { CellProfitLoss } from "./cells/cell.profit.loss/cell";
import { TurnService } from "./turn.service/turn.service";
import { CellEmpty } from "./cells/cell.empty/cell";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { ROOM_WS } from "./roomWS";
import { COLORS_PLAYER } from "src/app/const";

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
    private roomWS: Room_WS;

    constructor(gameCreateDto: GameCreateDto, private idRoom: string) {
        this.roomName = gameCreateDto.roomName;
        this.playerCount = gameCreateDto.players;
        this.numberPlayer = 0;
        this.roomWS = new ROOM_WS();
        this.chat = new Chat(this.roomWS);
        this.turnService = new TurnService(this.roomWS, this.players, this.cellsGame, this.chat);
        this.auction = new AuctionCompany(this.players, this.roomWS, this.chat, this.turnService);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
    }

    addPlayer(id: string, client: WebSocket) {
        this.roomWS.addWebSocket(id, client);
        const player = new PlayerDefault(this.roomWS, id, COLORS_PLAYER[this.numberPlayer], this.chat);
        this.numberPlayer++;
        this.players[id] = player;
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
        this.turnService.turn(this.players[idUser], value, isDouble);
    }

    playerBuyCompany(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('buyCompany' in company) {
            company.buyCompany(this.players[idUser]);
        };
        this.turnService.endTurn();
    }

    startAuction(idUser: string, indexCompany: number) {
        const company = this.cellsGame[indexCompany];
        if ('buyCompany' in company) {
            this.auction.startAuction(company, idUser);
        };
    }

    stepAuction(idUser: string): void {
        this.auction.stepAuction(this.players[idUser]);
    }

    leaveAuction(idUser: string): void {
        this.auction.leaveAuction(this.players[idUser]);
    }

    playerPayDebt(idUser: string, debtValue: number, receiverId?: string) {
        (receiverId)
            ? this.players[idUser].payRentCompany(debtValue, this.players[receiverId])
            : this.players[idUser].payDebt(debtValue);
        this.turnService.endTurn();
    }

    playerBuyStock(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('buyStock' in company) {
            company.buyStock(this.players[idUser]);
        }
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
                    this.cellsGame[indexCell] = new CellCompany(this.roomWS, this.chat, cell.company, this.auction, this.turnService, indexCell)
                    infoCell[indexCell] = { indexCell, location: cell.location }
                    break;
                case 'lossProfit':
                    const newCellProfit = new CellProfitLoss(this.roomWS, this.chat, this.turnService, cell.change);
                    this.cellsGame[indexCell] = newCellProfit;
                    infoCell[indexCell] = { indexCell, location: cell.location, cellSquare: newCellProfit.info }
                    break;
                case 'empty':
                    const newCellEmpty = new CellEmpty(this.roomWS, this.chat, this.turnService, cell.empty);
                    this.cellsGame[indexCell] = newCellEmpty;
                    infoCell[indexCell] = { indexCell, location: cell.location, cellSquare: newCellEmpty.info }
                    break;
                case '':
                    infoCell[indexCell] = { indexCell, location: cell.location }
                    break;
                default:
                    break;
            }
            this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INIT_BOARD, { board: infoCell })
        })
    }
}
