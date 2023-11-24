import { GameCreateDto } from "../dto/game.create.dto";
import { Chat } from "../chatGame";
import { AuctionI, PlayersGame, PrisonI, RoomI, cells, gameCell, infoRoom } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "../player";
import { CellCompany } from "../cells/cell.company";
import { defaultCell } from "../cells/defaultCell";
import { AuctionCompany } from "../auction.service";
import { TurnService } from "../turn.service";
import { CellEmpty } from "../cells/cell.empty";
import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, Room_WS } from "src/types/websocket";
import { ROOM_WS } from "../roomWS";
import { COLORS_PLAYER } from "src/app/const";
import { Prison } from "../prison";
import { OfferService } from "../offer.service";
import { CellTax } from "../cells/cell.tax";
import { CellProfit } from "../cells/cell.profit";
import { CellLoss } from "../cells/cell.loss";
import { EMESSAGE_CLIENT } from "src/app/const/enum";

export class RoomGame implements RoomI {

    playerCount: number;
    roomName: string;
    numberPlayer: number;
    players: PlayersGame = {};
    private cellsGame: cells[] = [];
    private chat: Chat;
    private auction: AuctionI;
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
        this.auction = new AuctionCompany(this.players, this.roomWS);
        this.prison = new Prison(this.turnService, this.chat);
        this.offerService = new OfferService(this.players, this.roomWS, this.cellsGame);
    }

    addPlayer(id: string, client: WebSocket): void {
        this.roomWS.addWebSocket(id, client);
        this.players[id] = new PlayerDefault(this.roomWS, id, COLORS_PLAYER[this.numberPlayer], this.chat, this.cellsGame);
        this.numberPlayer++;
        this.fillCellsGame();
        this.checkStartGame();

        Object.values(this.players).forEach((player) => {
            this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INIT_PLAYER, player.player);
        })//перенести в старт game
    }

    private checkStartGame() {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.START_GAME, { idRoom: this.idRoom });
        this.turnService.firstTurn();
    }

    playerMove({ idUser, isDouble, value }: DiceRollGamePayload): void {
        this.players[idUser].prison
            ? this.prison.turnPrison(this.players[idUser], value, isDouble)
            : this.turnService.turn(this.players[idUser], value, isDouble)
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

    addChatMessage({ message, idUser }: MessageChatGamePayload): void {
        this.chat.addMessage(message, this.players[idUser]);
    }

    returnInfoRoom(): infoRoom {
        return {
            maxPLayers: this.playerCount,
            idRoom: this.idRoom,
            roomName: this.roomName,
            players: Object.values(this.players).map((player) => player.player),
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
                    infoCell[indexCell] = { ...infoCell[indexCell], company: { ...infoCell[indexCell].company, ...newCellCompany.info } };
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
