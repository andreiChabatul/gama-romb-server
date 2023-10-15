import { MONOPOLY_COMPANY, NO_MONOPOY_COMPANY } from "src/app/const";
import { CellCompanyI, PlayerDefaultI, PlayersGame, cells, companyCheckNoMonopoly, dictionary, language } from "src/types";
import { Chat } from "../chatGame";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { DESCRIPTION_TURN } from "./description/description";
import { changeMessage } from "../services/change.message";
import { Injectable } from "@nestjs/common";
import LanguageServices from "../../languageServices";


@Injectable()
export class TurnService {

    private indexActive: number;
    private isDouble: boolean;
    private language: language = 'ru';
    private doubleCounter: number = 0;

    constructor(
        private roomWS: Room_WS,
        private players: PlayersGame,
        private cellsGame: cells[],
        private chat: Chat,
    ) { }

    firstTurn(): void {
        this.indexActive = Math.floor(Math.random() * Object.keys(this.players).length);
        this.chat.addMessage(LanguageServices.getString('TURN-SERVISE', 'firstTurn', this.activePlayer()));
        this.updateTurn();
    }

    turn(player: PlayerDefaultI, value: number, isDouble: boolean): void {
        this.isDouble = isDouble;
        player.position = value;
        if (this.cellsGame[player.position]) {
            this.cellsGame[player.position].cellProcessing(player, value);
        };
    }

    private nextTurn(): void {
        if (this.isDouble) {
            this.doubleCounter++;
            this.checkDouble();
            this.chat.addMessage(changeMessage(DESCRIPTION_TURN[this.language].doubleTurn, null, this.activePlayer()));
        } else {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
            this.chat.addMessage(changeMessage(DESCRIPTION_TURN[this.language].turn, null, this.activePlayer()));
        }
        this.updateTurn();
    }

    endTurn(): void {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.END_TURN);
        this.nextTurn();
    };

    private updateTurn(): void {
        this.updateMonopolyCompany();
        this.updateNoMonopolyCompany();
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_TURN,
            {
                turnId: this.activePlayer().userId
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

    private activePlayer(): PlayerDefaultI {
        return this.players[Object.keys(this.players)[this.indexActive]];
    }

    private calcIndexActive(): number {
        let futureIndexActive = this.indexActive + 1;
        futureIndexActive >= Object.keys(this.players).length ? futureIndexActive = 0 : '';
        return futureIndexActive;
    }

    private checkDouble(): void {
        if (this.doubleCounter === 3) {
            console.log(this.activePlayer().name, 'jail');
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
        }
    }
}