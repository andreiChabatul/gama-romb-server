import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chatGame";
import { InfoRoom, PlayersGame, PrisonI, RoomI, cells, gameCell } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { AuctionCompany } from "./auctionCompany";
import { TurnService } from "./turn.service";
import { CellEmpty } from "./cells/cell.empty";
import { ContorolCompanyPayload, DiceRollGamePayload, EACTION_WEBSOCKET, OfferDealPayload, Room_WS } from "src/types/websocket";
import { ROOM_WS } from "./roomWS";
import { COLORS_PLAYER } from "src/app/const";
import { Prison } from "./prison";
import { OfferService } from "./offer.service";
import { CellTax } from "./cells/cell.tax";
import { CellProfit } from "./cells/cell.profit";
import { CellLoss } from "./cells/cell.loss";

export class RoomGame implements RoomI {

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
    private offerService: OfferService;

    constructor(gameCreateDto: GameCreateDto, private idRoom: string) {
        this.roomName = gameCreateDto.roomName;
        this.playerCount = gameCreateDto.players;
        this.numberPlayer = 0;
        this.roomWS = new ROOM_WS();
        this.chat = new Chat(this.roomWS);
        this.turnService = new TurnService(this.roomWS, this.players, this.cellsGame, this.chat);
        this.auction = new AuctionCompany(this.players, this.roomWS, this.chat, this.turnService);
        this.prison = new Prison(this.turnService, this.chat);
        this.offerService = new OfferService(this.players, this.roomWS, this.chat, this.turnService, this.cellsGame);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
    }

    addPlayer(id: string, client: WebSocket): void {
        this.roomWS.addWebSocket(id, client);
        this.players[id] = new PlayerDefault(this.roomWS, id, COLORS_PLAYER[this.numberPlayer], this.chat, this.cellsGame);
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

    playerMove(diceRollGamePayload: DiceRollGamePayload): void {
        const { idUser, isDouble, value } = diceRollGamePayload;
        this.players[idUser].prison
            ? this.prison.turnPrison(this.players[idUser], value, isDouble)
            : this.turnService.turn(this.players[idUser], value, isDouble)
    }

    activeCell(idUser: string): void {
        const indexCell = this.players[idUser].position;
        this.cellsGame[indexCell].activateCell();
        this.turnService.endTurn();
    }

    controlCompany(contorolCompanyPayload: ContorolCompanyPayload): void {
        const { action, idUser, indexCompany } = contorolCompanyPayload;
        const company = this.cellsGame[indexCompany];
        if ('controlCompany' in company) {
            company.controlCompany(action, this.players[idUser]);
        };
    }

    offerDealControl(offerDealPayload: OfferDealPayload): void {
        this.offerService.controlDeal(offerDealPayload);
    }

    addChatMessage(message: string, idUser: string): void {
        this.chat.addMessage(message, this.players[idUser]);
    }

    returnInfoRoom(): InfoRoom {
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
            infoCell[indexCell] = { indexCell, ...cell };

            switch (cell.type) {
                case "company": {
                    const newCellCompany = new CellCompany(this.roomWS, cell.company, this.auction, this.players, indexCell);
                    this.cellsGame[indexCell] = newCellCompany;
                    infoCell[indexCell] = { ...infoCell[indexCell], cellCompany: newCellCompany.info };
                    break;
                }
                case "empty": {
                    this.cellsGame[indexCell] = new CellEmpty(indexCell, cell.nameCell, this.roomWS, this.prison);
                    break;
                }
                case "tax": {
                    this.cellsGame[indexCell] = new CellTax(indexCell, cell.nameCell, this.roomWS);
                    break;
                }
                case "profit": {
                    this.cellsGame[indexCell] = new CellProfit(indexCell, this.roomWS);
                    break;
                }
                case "loss": {
                    this.cellsGame[indexCell] = new CellLoss(indexCell, this.roomWS);
                    break;
                }

            }



        })
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INIT_BOARD, { board: infoCell })
    }
}
