import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chatGame/chat.room";
import { PlayersGame, RoomClass, cells } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { AuctionCompany } from "./auctionCompany/auctionCompany";
import { CellProfitLoss } from "./cells/cell.profit.loss/cell";
import { TurnService } from "./turn.service/turn.service";
import { CellEmpty } from "./cells/cell.empty/cell";

export class Room implements RoomClass {

    numberPLayer = 0;
    playerCount: number;
    isVisiblity: boolean;
    roomName: string;
    players: PlayersGame = {};
    private cellsGame: cells[] = [];
    private game: Game;
    private chat: Chat;
    private auction: AuctionCompany;
    private turnService: TurnService;

    constructor(gameCreateDto: GameCreateDto, private idRoom: string) {
        this.roomName = gameCreateDto.roomName;
        this.playerCount = gameCreateDto.players;
        this.chat = new Chat(this.players);
        this.game = new Game(this.players, this.cellsGame);
        this.turnService = new TurnService(idRoom, this.game, this.players, this.playerCount, this.cellsGame, this.chat);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
        this.fillCellsGame();
    }

    addPlayer(id: string, client: WebSocket) {
        const player = new PlayerDefault(id, this.numberPLayer, this.chat, client);
        this.numberPLayer += 1;
        this.players[id] = player;
        this.checkStartGame();
    }

    private checkStartGame() {
        this.turnService.firstTurn();
    }

    playerMove(idUser: string, value: number, isDouble: boolean) {
        this.turnService.turn(idUser, value, isDouble);
    }

    playerBuyCompany(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('buyCompany' in company) {
            company.buyCompany(this.players[idUser]);
        };
        this.turnService.endTurn();
    }

    startAuction(idUser: string, indexCompany: number) {
        this.auction = new AuctionCompany(this.chat, this.players, this.turnService);
        const company = this.cellsGame[indexCompany];
        if ('buyCompany' in company) {
            this.auction.startAuction(company, idUser);
        };
    }

    stepAuction(idUser: string): void {
        this.auction.stepAuction(idUser);
    }

    leaveAuction(idUser: string): void {
        this.auction.leaveAuction(idUser);
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
        this.chat.addMessage(message, idUser);
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

        defaultCell.map((cell, index) => {
            switch (cell.type) {
                case 'company':
                    this.cellsGame[index] = new CellCompany(this.chat, cell.company, index)
                    break;
                case 'lossProfit':
                    this.cellsGame[index] = new CellProfitLoss(this.chat, this.turnService, cell.change);
                    break;
                case 'empty':
                    this.cellsGame[index] = new CellEmpty(this.chat, this.turnService, cell.empty);
                    break;

                default:
                    break;
            }

        })
    }
}
