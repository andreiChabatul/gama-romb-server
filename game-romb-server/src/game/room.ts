import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chatGame";
import { PlayersGame, PrisonI, RoomClass, cells, controlCompany, gameCell, offerDealInfo } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { AuctionCompany } from "./auctionCompany";
import { TurnService } from "./turn.service";
import { CellEmpty } from "./cells/cell.empty";
import { ContorolCompanyPayload, DiceRollGamePayload, EACTION_WEBSOCKET, OfferDealPayload, Room_WS, calcValuePayload } from "src/types/websocket";
import { ROOM_WS } from "./roomWS";
import { COLORS_PLAYER, DEBT_PRISON } from "src/app/const";
import { Prison } from "./prison";
import { EMESSAGE_CLIENT } from "src/app/const/enum";
import { OfferService } from "./offer.service";

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
    private offerService: OfferService;

    constructor(gameCreateDto: GameCreateDto, private idRoom: string) {
        this.roomName = gameCreateDto.roomName;
        this.playerCount = gameCreateDto.players;
        this.numberPlayer = 0;
        this.roomWS = new ROOM_WS();
        this.chat = new Chat(this.roomWS);
        this.turnService = new TurnService(this.roomWS, this.players, this.cellsGame, this.chat);
        this.auction = new AuctionCompany(this.players, this.roomWS, this.chat, this.turnService);
        this.prison = new Prison(this.turnService, this.roomWS);
        this.offerService = new OfferService(this.players, this.roomWS, this.chat, this.turnService, this.cellsGame);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
    }

    async addPlayer(id: string, client: WebSocket) {
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

    playerMove(diceRollGamePayload: DiceRollGamePayload) {
        const { idUser, isDouble, value } = diceRollGamePayload;
        this.players[idUser].prison
            ? this.prison.turnPrison(this.players[idUser], value, isDouble)
            : this.turnService.turn(this.players[idUser], value, isDouble)
    }

    playerPay(calcValuePayload: calcValuePayload): void {
        const { action, idUser, debtValue, indexCompany } = calcValuePayload;
        const player = this.players[idUser];
        let resultValue = player.prison ? DEBT_PRISON : debtValue;

        switch (action) {
            case 'profit':
                player.addTotal = resultValue;
                break;
            case "pay":
                player.minusTotal(resultValue, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_DEBT);
                this.turnService.endTurn();
                break;
            case "payRent":
                const company = this.cellsGame[indexCompany];
                if ('controlCompany' in company) {
                    const rentDebt = company.rentCompany;
                    const ownedPlayer = this.players[company.owned];
                    ownedPlayer.addTotal = rentDebt;
                    this.players[idUser].minusTotal(rentDebt, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_RENT);
                };
                this.turnService.endTurn();
                break;
            case "payPrison":
                player.minusTotal(DEBT_PRISON, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_PRISON);
                this.prison.deletePrisoner(player);
                break;
            default:
                break;
        }
    }

    controlCompany(contorolCompanyPayload: ContorolCompanyPayload) {
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
            infoCell[indexCell] = { indexCell, ...cell };
            if (cell.type === 'company') {
                const newCellCompany = new CellCompany(this.roomWS, this.chat, cell.company, this.auction, this.turnService, indexCell);
                this.cellsGame[indexCell] = newCellCompany;
                infoCell[indexCell] = { ...infoCell[indexCell], cellCompany: newCellCompany.info };
            }
            else {
                this.cellsGame[indexCell] = new CellEmpty(this.roomWS, this.turnService, cell.nameCell, this.prison, indexCell);;
            };

        })
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INIT_BOARD, { board: infoCell })
    }
}
