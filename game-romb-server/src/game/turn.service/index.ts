import { MONOPOLY_COMPANY, NO_MONOPOY_COMPANY } from "src/const";
import { CellCompanyI, playersGame, cells, companyCheckNoMonopoly } from "src/types";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { chatGame } from "../chatGame";
import { PlayerDefaultI } from "src/types/player";

export class TurnService {

    private indexActive: number;
    private isDouble: boolean;
    private doubleCounter: number = 0;
    private playersActive: playersGame = {};

    constructor(private idRoom: string, private players: playersGame, private cellsGame: cells[]) { }

    firstTurn(): void {
        this.filterBankrupt();
        this.indexActive = Math.floor(Math.random() * Object.keys(this.players).length);
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.FIRST_TURN, idUser: this.activePlayer.userId });
        this.updateTurn();
    }

    turn(player: PlayerDefaultI, value: number, isDouble: boolean): void {
        player.position = value;
        const cell = this.cellsGame[player.position];
        this.isDouble = isDouble;
        if (cell) {
            chatGame.addChatMessage(this.idRoom, {
                action: EMESSAGE_CLIENT.INTO_CELL,
                idUser: player.userId,
                cellId: cell.index,
                valueroll: value
            })
            cell.movePlayer(player, value);
        };
    }

    private nextTurn(): void {
        if (this.isDouble) {
            this.doubleCounter++;
            this.checkDouble();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer.userId });
        } else {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer.userId });
        }
        this.updateTurn();
    }

    endTurn(): void {
        storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_TURN);
        this.filterBankrupt();
        // this.checkWinner() ? this.nextTurn() : '';
        this.nextTurn() //template
    };

    updateTurn(idUser?: string): void {
        this.updateMonopolyCompany();
        this.updateNoMonopolyCompany();
        const payload = {
            turnId: this.activePlayer.userId
        };
        idUser
            ? storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.UPDATE_TURN, payload)
            : storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.UPDATE_TURN, payload);
    }

    private updateMonopolyCompany(): void {
        MONOPOLY_COMPANY.map((country) => {
            const companyMonopoly = this.cellsGame.filter((cell) =>
                'infoCompany' in cell && cell.infoCompany.countryCompany === country
            ) as CellCompanyI[];

            checkMonopoly(companyMonopoly);
        })

        function checkMonopoly(country: CellCompanyI[]): void {
            let isMonopoly = true;
            for (let index = 0; index < country.length - 1; index++) {
                if (!country[index].owned || country[index].owned !== country[index + 1].owned) {
                    isMonopoly = false;
                    break;
                }
            }

            country.forEach((country) => country.monopoly = isMonopoly);
        }
    }

    private updateNoMonopolyCompany(): void {
        const cellResult: companyCheckNoMonopoly = {};

        const companyNoMonopoly = this.cellsGame.filter((cell) =>
            'infoCompany' in cell && cell.infoCompany.countryCompany === NO_MONOPOY_COMPANY
        ) as CellCompanyI[];

        companyNoMonopoly.map((company) => {
            const owned = company.owned;
            const indexCompany = company.index;
            if (company.owned) {
                (cellResult[owned])
                    ? cellResult[owned].push(indexCompany)
                    : cellResult[owned] = new Array(1).fill(indexCompany);
            }
        }
        )

        Object.values(cellResult).map((indexs: number[]) => {
            indexs.map((index) => {
                const cell = this.cellsGame[index]
                if ('quantityStock' in cell) {
                    cell.quantityStock = indexs.length;
                }
            }
            )
        })
    }

    get activePlayer(): PlayerDefaultI {
        return this.players[Object.keys(this.playersActive)[this.indexActive]];
    }

    private calcIndexActive(): number {
        let futureIndexActive = this.indexActive + 1;
        futureIndexActive >= Object.keys(this.playersActive).length ? futureIndexActive = 0 : '';
        return futureIndexActive;
    }

    private checkDouble(): void {
        if (this.doubleCounter === 3) {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
        }
    }

    filterBankrupt(): void {
        this.playersActive = Object.fromEntries(
            Object.entries(this.players).filter(([, value]) => !value.bankrupt));
    };

    checkWinner(): boolean {
        const userIds = Object.keys(this.playersActive);
        if (userIds.length === 1) {
            storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_GAME, { winUser: userIds[0] })
            return false;
        } else {
            return true;
        }
    };

}