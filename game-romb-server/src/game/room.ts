import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chat.room";
import { CellCompanyI, EACTION_WEBSOCKET, Player, PlayersGame, RoomClass, cells, countryCompanyMonopoly, gameCell } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { TAX_10, TAX_5 } from "./defaultBoard/defaultBoard";
import { CellTax } from "./cells/cell.tax";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { TIME_AUCTION_COMPANY } from "src/app/const";


export class Room implements RoomClass {

    numberPLayer = 0;
    maxPlayers: number;
    isVisiblity: boolean;
    roomName: string;
    players: PlayersGame = {} as PlayersGame;
    private cellsGame: cells[] = [];
    private game: Game;
    private chat: Chat;
    idRoom: string;
    indexActive: number;
    timerTurn: number;
    timer: NodeJS.Timeout;

    constructor(gameCreateDto: GameCreateDto, idRoom: string) {
        this.idRoom = idRoom;
        this.roomName = gameCreateDto.roomName;
        this.maxPlayers = gameCreateDto.players;
        this.chat = new Chat();
        this.indexActive = 0;
        this.game = new Game(this.players, this.cellsGame);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
        this.fillCellsGame();
    }

    addPlayer(id: string, client: WebSocket) {
        const player = new PlayerDefault(id, this.numberPLayer, this.chat, client);
        this.numberPLayer += 1;
        this.players[id] = player;
        this.game.startGame();
        this.checkStartGame();

    }

    private checkStartGame() {
        this.updateRoom();
    }

    playerMove(idUser: string, value: number, isDouble: boolean) {
        const player = this.players[idUser];
        player.setPosition(value);
        this.updateRoom();
        if (this.cellsGame[player.getCellPosition()]) {
            this.timerTurn = this.cellsGame[player.getCellPosition()].cellProcessing(player);
            this.updateTimerTurn();
        } else {
            this.indexActive = this.calcIndexActive();
            this.updateRoom();
        }

    }

    private updateTimerTurn(): void {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.indexActive = this.calcIndexActive();
            this.updateRoom()
        }, this.timerTurn);

    }

    playerBuyCompany(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('buyCompany' in company) {
            company.buyCompany(this.players[idUser]);
        }
        this.timerTurn = 0;
        this.updateTimerTurn();
    }

    playerCancelBuyCompany(indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('cancelBuyCompany' in company) {
            company.cancelBuyCompany();
        }
        this.timerTurn = TIME_AUCTION_COMPANY;
        this.updateRoom();
        this.updateTimerTurn();
    }


    playerMakeBidAuction(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('auctionStep' in company) {
            company.auctionStep(this.players[idUser]);
        }
        this.timerTurn = TIME_AUCTION_COMPANY;
        this.updateTimerTurn();
    }

    companyAuctionEnd(indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('auctionEnd' in company) {
            company.auctionEnd();
        }
        this.timerTurn = 0;
        this.updateTimerTurn();
    }

    playerBuyStock(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('buyStock' in company) {
            company.buyStock(this.players[idUser]);
        }
        this.updateRoom();
    }

    addChatMessage(message: string, idUser: string) {
        const playerChat = this.returnInfoPlayers().find(player => player.id === idUser);
        this.chat.addMessage(message, playerChat);
        this.updateRoom();
    }

    updateRoom() {
        this.updateTurnPlayer();
        this.updateMonopolyCompany();
        const payload = {
            idRoom: this.idRoom,
            players: this.returnInfoPlayers(),
            chat: this.chat.getAllMessage(),
            board: this.game.getBoard()
        }

        Object.keys(this.players).map((key) => this.players[key].webSocket.
            send(JSON.stringify(
                {
                    action: EACTION_WEBSOCKET.UPDATE_ROOM,
                    payload
                })))
    }

    returnInfoRoom() {
        return {
            maxPLayers: this.maxPlayers,
            players: this.returnInfoPlayers(),
            idRoom: this.idRoom,
            isVisiblity: this.isVisiblity,
            roomName: this.roomName
        }
    }

    private returnInfoPlayers(): Player[] {
        return Object.keys(this.players).map((key) => this.players[key].returnPlayer(), []);
    }

    private fillCellsGame() {

        defaultCell.map((cell, index) => {
            if (cell.company) {
                this.cellsGame[index] = new CellCompany(cell.company, this.players, index, this.chat)
            }
        })

        this.cellsGame[16] = new CellTax(TAX_5, this.chat);
        this.cellsGame[35] = new CellTax(TAX_10, this.chat);
    }


    private calcIndexActive(): number {
        let futureIndexActive = this.indexActive + 1;
        futureIndexActive >= this.maxPlayers ? futureIndexActive = 0 : '';
        return futureIndexActive;
    }


    private updateTurnPlayer() {
        Object.keys(this.players).map((id) => {
            const player = this.players[id];
            player.setTurnPlayer(false)
            player.getNumberPlayer() === this.indexActive
                ? player.setTurnPlayer(true)
                : ''
        })
    }


    private updateMonopolyCompany() {
        const countryCompany: countryCompanyMonopoly[] = ['germany', 'italia', 'britania', 'sweden', 'canada', 'kazah', 'china', 'usa'];

        countryCompany.map((country) => {
            const companyMonopoly = this.cellsGame.filter((cell) =>
                'getCountryCompany' in cell && cell.getCountryCompany() === country
            ) as CellCompanyI[];

            checkMonopoly(companyMonopoly);
        })

        function checkMonopoly(country: CellCompanyI[]) {
            let isMonopoly = true;
            for (let index = 0; index < country.length - 1; index++) {
                if (country[index].getOwned() === null
                    || country[index].getOwned() !== country[index + 1].getOwned()) {
                    isMonopoly = false;
                    break;
                }
            }

            country.forEach((country) => country.setMonopoly(isMonopoly));
        }

    }



}
