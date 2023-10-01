import { MONOPOLY_COMPANY, NO_MONOPOY_COMPANY } from "src/app/const";
import { CellCompanyI, PlayersGame,  cells, companyCheckNoMonopoly } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class TurnService {

    private indexActive: number;
    private isDouble: boolean;

    constructor(
        private idRoom: string,
        private players: PlayersGame,
        private playerCount: number,
        private cellsGame: cells[],
        private chat: Chat) { }

    firstTurn(): void {
        this.indexActive = Math.floor(Math.random() * this.playerCount);
    }

    turn(idUser: string, value: number, isDouble: boolean): void {
        this.isDouble = isDouble;
        const player = this.players[idUser];
        player.position = value;
        if (this.cellsGame[player.position]) {
            this.cellsGame[player.position].cellProcessing(player, value);
        };
    }


    private nextTurn(): void {
        Object.values(this.players).forEach((player) => {
            player.sendMessage(EACTION_WEBSOCKET.END_TURN);
        });

        if (this.isDouble) {
            this.chat.addMessage('Дубль')

        } else {
            this.indexActive = this.calcIndexActive();
            this.chat.addMessage('Ходит')
        }
    }


    endTurn(): void {
        this.nextTurn();
        this.sendAllPlayer(EACTION_WEBSOCKET.END_TURN);
    }

    // private initalRoom(): void {
    //     this.updateMonopolyCompany();
    //     this.updateNoMonopolyCompany();
    //     const payload: UpdateRoom = {
    //         idRoom: this.idRoom,
    //         players: this.returnInfoPlayers(),
       
    //         turnId: Object.keys(this.players)[this.indexActive]
    //     }
    //     this.sendAllPlayer(EACTION_WEBSOCKET.UPDATE_ROOM, payload);
    // }

    private sendAllPlayer(action: EACTION_WEBSOCKET, payload?: {}): void {
        Object.values(this.players).forEach((player) =>
            player.sendMessage(action, payload));
    }


    private updateMonopolyCompany(): void {
        MONOPOLY_COMPANY.map((country) => {
            const companyMonopoly = this.cellsGame.filter((cell) =>
                'info' in cell && cell.info.countryCompany === country
            ) as CellCompanyI[];

            checkMonopoly(companyMonopoly);
        })

        function checkMonopoly(country: CellCompanyI[]) {
            let isMonopoly = true;
            for (let index = 0; index < country.length - 1; index++) {
                if (country[index].owned === null
                    || country[index].owned !== country[index + 1].owned) {
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
            'info' in cell && cell.info.countryCompany === NO_MONOPOY_COMPANY
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

    private calcIndexActive(): number {

        let futureIndexActive = this.indexActive + 1;
        futureIndexActive >= this.playerCount ? futureIndexActive = 0 : '';
        return futureIndexActive;
    }
}