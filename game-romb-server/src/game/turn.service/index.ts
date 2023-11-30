import { MONOPOLY_COMPANY, NO_MONOPOY_COMPANY } from "src/app/const";
import { CellCompanyI, PlayerDefaultI, playersGame, cells, companyCheckNoMonopoly } from "src/types";
import { Chat } from "../chatGame";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { EMESSAGE_CLIENT } from "src/app/const/enum";

export class TurnService {

    private indexActive: number;
    private isDouble: boolean;
    private doubleCounter: number = 0;
    private playersActive: playersGame = {};

    constructor(
        private roomWS: Room_WS,
        private players: playersGame,
        private cellsGame: cells[],
        private chat: Chat,
    ) { }

    firstTurn(): void {
        this.filterBankrupt();
        this.indexActive = Math.floor(Math.random() * Object.keys(this.players).length);
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.FIRST_TURN, idUser: this.activePlayer.userId });
        this.updateTurn();
    }

    turn(player: PlayerDefaultI, value: number, isDouble: boolean): void {
        player.position = value;
        const cell = this.cellsGame[player.position];
        this.isDouble = isDouble;
        if (cell) {
            this.chat.addSystemMessage({
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
            this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer.userId });
        } else {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
            this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer.userId });
        }
        this.updateTurn();
    }

    endTurn(): void {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.END_TURN);
        this.filterBankrupt();
        // this.checkWinner() ? this.nextTurn() : '';
        this.nextTurn() //template
    };

    updateTurn(): void {
        this.updateMonopolyCompany();
        this.updateNoMonopolyCompany();
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_TURN,
            {
                turnId: this.activePlayer.userId
            });
    }

    private updateMonopolyCompany(): void {
        MONOPOLY_COMPANY.map((country) => {
            const companyMonopoly = this.cellsGame.filter((cell) =>
                'infoCompany' in cell && cell.infoCompany.countryCompany === country
            ) as CellCompanyI[];

            checkMonopoly(companyMonopoly);
        })

        function checkMonopoly(country: CellCompanyI[]) {
            let isMonopoly = true;
            for (let index = 0; index < country.length - 1; index++) {
                if (country[index].owned === null || country[index].owned !== country[index + 1].owned) {
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
            if (company.owned !== null) {
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
            this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.END_GAME, { winUser: userIds[0] })
            return false;
        } else {
            return true;
        }
    };

}