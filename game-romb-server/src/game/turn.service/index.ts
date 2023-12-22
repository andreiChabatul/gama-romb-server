import { cells } from "src/types";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { chatGame } from "../chatGame";
import { storage_players } from "../playerStorage";

export class TurnService {

    private indexActive: number;
    private isDouble: boolean;
    private doubleCounter: number = 0;
    private playersActive: string[];

    constructor(private idRoom: string) { }

    firstTurn(): void {
        this.playersActive = storage_players.getPlayersActive(this.idRoom);
        this.indexActive = Math.floor(Math.random() * storage_players.getPlayersActive(this.idRoom).length);
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.FIRST_TURN, idUser: this.activePlayer });
        this.updateTurn();
    }

    turn(idUser: string, value: number, isDouble: boolean, cell: cells): void {
        this.isDouble = isDouble;
        chatGame.addChatMessage(this.idRoom, {
            action: EMESSAGE_CLIENT.INTO_CELL,
            idUser,
            cellId: cell.index,
            valueroll: value
        })
        cell.movePlayer(idUser, value);
    }

    private nextTurn(): void {
        if (this.isDouble) {
            this.doubleCounter++;
            this.checkDouble();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer });
        } else {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer });
        }
        this.updateTurn();
    }

    get activePlayer(): string {
        return this.playersActive[this.indexActive]
    }

    endTurn(): void {
        storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_TURN);
        // this.checkWinner() ? this.nextTurn() : '';
        this.nextTurn() //template
    };

    updateTurn(idUser?: string): void {
        // this.updateMonopolyCompany();
        // this.updateNoMonopolyCompany();
        const payload = {
            turnId: this.activePlayer
        };
        idUser
            ? storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.UPDATE_TURN, payload)
            : storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.UPDATE_TURN, payload);
    }

    // private updateMonopolyCompany(): void {
    //     MONOPOLY_COMPANY.map((country) => {
    //         const companyMonopoly = this.cellsGame.filter((cell) =>
    //             'infoCompany' in cell && cell.infoCompany.countryCompany === country
    //         ) as CellCompanyI[];

    //         checkMonopoly(companyMonopoly);
    //     })

    //     function checkMonopoly(country: CellCompanyI[]): void {
    //         let isMonopoly = true;
    //         for (let index = 0; index < country.length - 1; index++) {
    //             if (!country[index].owned || country[index].owned !== country[index + 1].owned) {
    //                 isMonopoly = false;
    //                 break;
    //             }
    //         }

    //         country.forEach((country) => country.monopoly = isMonopoly);
    //     }
    // }

    // private updateNoMonopolyCompany(): void {
    //     const cellResult: companyCheckNoMonopoly = {};

    //     const companyNoMonopoly = this.cellsGame.filter((cell) =>
    //         'infoCompany' in cell && cell.infoCompany.countryCompany === NO_MONOPOY_COMPANY
    //     ) as CellCompanyI[];

    //     companyNoMonopoly.map((company) => {
    //         const owned = company.owned;
    //         const indexCompany = company.index;
    //         if (company.owned) {
    //             (cellResult[owned])
    //                 ? cellResult[owned].push(indexCompany)
    //                 : cellResult[owned] = new Array(1).fill(indexCompany);
    //         }
    //     }
    //     )

    //     Object.values(cellResult).map((indexs: number[]) => {
    //         indexs.map((index) => {
    //             const cell = this.cellsGame[index]
    //             if ('quantityStock' in cell) {
    //                 cell.quantityStock = indexs.length;
    //             }
    //         }
    //         )
    //     })
    // }

    private calcIndexActive(): number {
        let futureIndexActive = this.indexActive + 1;
        futureIndexActive >= this.playersActive.length ? futureIndexActive = 0 : '';
        return futureIndexActive;
    }

    private checkDouble(): void {
        if (this.doubleCounter === 3) {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
        }
    }

    checkWinner(): boolean {
        const userIds = storage_players.getPlayersActive(this.idRoom);
        if (userIds.length === 1) {
            storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_GAME, { winUser: userIds[0] })
            return false;
        } else {
            return true;
        }
    };

}