import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chat.room";
import { CellCompanyI, EACTION_WEBSOCKET, Player, PlayersGame, RoomClass, cells, companyCheckNoMonopoly } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { TAX_10, TAX_5 } from "./defaultBoard/defaultBoard";
import { CellTax } from "./cells/cell.tax";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";
import { MONOPOLY_COMPANY, NO_MONOPOY_COMPANY, TIME_AUCTION_COMPANY } from "src/app/const";

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
    private indexActive: number;
    private isDouble: boolean;


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
        this.isDouble = isDouble;
        const player = this.players[idUser];
        player.setPosition(value);
        this.updateRoom();
        if (this.cellsGame[player.getCellPosition()]) {
            this.cellsGame[player.getCellPosition()].cellProcessing(player, value);
        } else {
            this.indexActive = this.calcIndexActive();
            this.updateRoom();
        }

    }

    playerBuyCompany(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('buyCompany' in company) {
            company.buyCompany(this.players[idUser]);
        };
        this.nextTurn();
        this.updateRoom()
    }

    playerCancelBuyCompany(indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('cancelBuyCompany' in company) {
            company.cancelBuyCompany();
        }
    }

    playerMakeBidAuction(idUser: string, indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('auctionStep' in company) {
            company.auctionStep(this.players[idUser]);
        }
    }

    companyAuctionEnd(indexCompany: number): void {
        const company = this.cellsGame[indexCompany];
        if ('auctionEnd' in company) {
            company.auctionEnd();
        }
        this.nextTurn();
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
        this.updateNoMonopolyCompany();
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

    private nextTurn(): void {
        if (this.isDouble) {

        } else {
            this.indexActive = this.calcIndexActive();
        }
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


    private updateMonopolyCompany(): void {
        MONOPOLY_COMPANY.map((country) => {
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

    private updateNoMonopolyCompany(): void {
        const cellResult: companyCheckNoMonopoly = {};

        const companyNoMonopoly = this.cellsGame.filter((cell) =>
            'getCountryCompany' in cell && cell.getCountryCompany() === NO_MONOPOY_COMPANY
        ) as CellCompanyI[];

        companyNoMonopoly.map((company) => {
            const owned = company.getOwned();
            const indexCompany = company.getIndexCompany();
            if (company.getOwned() !== null) {
                (cellResult[owned])
                    ? cellResult[owned].push(indexCompany)
                    : cellResult[owned] = new Array(1).fill(indexCompany);
            }
        }
        )
        Object.values(cellResult).map((indexs: number[]) => {
            indexs.map((index) => {
                const cell = this.cellsGame[index]
                if ('setQuantityStock' in cell) {
                    cell.setQuantityStock(indexs.length);
                }
            }
            )
        })

    }

}
