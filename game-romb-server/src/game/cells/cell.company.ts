import { CellCompanyI, CompanyInfo, EACTION_WEBSOCKET, GameCellCompanyInfo, PlayerDefault, PlayersGame, countryCompany, countryCompanyMonopoly, infoCellTurn, language, nameCompany } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { DESCRIPTION_CELL } from "./description/cell.description";

export class CellCompany implements CellCompanyI {

    private isPledge: boolean;
    private indexCompany: number;
    private owned: PlayerDefault | null;
    players: PlayersGame;
    chat: Chat;
    private compnanyInfo: CompanyInfo;
    private rentIndex: number;
    private isMonopoly: boolean;
    private quantityStock: number;
    private language: language = 'ru';

    constructor(companyInfo: CompanyInfo, players: PlayersGame, indexCompany: number, chat: Chat) {
        this.compnanyInfo = companyInfo;
        this.indexCompany = indexCompany;
        this.players = players;
        this.chat = chat;
        this.quantityStock = 0;
    }

    buyCompany(buyer: PlayerDefault, price?: number): void {
        this.owned = buyer;
        buyer.buyCompany(price ? price : this.compnanyInfo.priceCompany);
        this.compnanyInfo.countryCompany === 'ukraine' ? this.quantityStock = 1 : '';
        this.chat.addMessage
            (`${buyer.getNamePlayer()} buy company ${this.compnanyInfo.nameCompany} for ${price ? price : this.compnanyInfo.priceCompany}`);
    }

    cellProcessing(player: PlayerDefault, valueRoll?: number): void {

        const payload: infoCellTurn = {
            nameCell: this.compnanyInfo.nameCompany,
            titleCell: this.compnanyInfo.nameCompany,
            description: DESCRIPTION_CELL[this.language].buyCompany
                .replaceAll('PRICE', String(this.compnanyInfo.priceCompany)),
            indexCompany: this.indexCompany,
            buttons: 'buy'
        }



        player.getWebSocket().send(JSON.stringify(
            {
                action: EACTION_WEBSOCKET.INFO_CELL_TURN, payload
            }))

        // if (this.owned && this.owned !== player) {
        //     let resultRent = this.compnanyInfo.rentCompanyInfo[this.rentIndex];
        //     resultRent = (this.compnanyInfo.countryCompany === 'ukraine') ? resultRent * valueRoll : resultRent;
        //     this.owned.enrollRentCompany(resultRent);
        //     player.payRentCompany(resultRent);
        //     return TIME_TURN_DEFAULT;
        // }
        // else if (this.owned === player) { return; }
        // else {
        //     if (this.compnanyInfo.priceCompany >= player.getTotalPlayer()) {
        //         this.auctionCompany();
        //     } else {
        //         this.sellCompany(player);
        //     }
        // }
        // return TIME_BUY_COMPANY;
    }

   
    getInfoCellCompany(): GameCellCompanyInfo {
        this.updateRentCompany();
        return {
            nameCompany: this.compnanyInfo.nameCompany,
            countryCompany: this.compnanyInfo.countryCompany,
            priceCompany: this.compnanyInfo.priceCompany,
            rentCompany: this.compnanyInfo.rentCompanyInfo[this.rentIndex],
            isPledge: this.isPledge,
            priceStock: this.compnanyInfo.priceStock,
            isMonopoly: this.isMonopoly,
            shares: this.quantityStock,
            owned: this.owned ? this.owned.getNumberPlayer() : undefined,
        }
    }

    private updateRentCompany() {
        this.rentIndex = 0;
        if (this.isMonopoly) {
            this.rentIndex = 1;
            (this.compnanyInfo.countryCompany === 'ukraine') ? this.quantityStock = 2 : '';
        };
        (this.compnanyInfo.countryCompany === 'ukraine')
            ? this.rentIndex = this.quantityStock
            : this.rentIndex += this.quantityStock;
    }

    buyStock(player: PlayerDefault): void {
        this.quantityStock += 1;
        player.buyStock(this.compnanyInfo.priceStock, this.compnanyInfo.nameCompany);
    }

    sellStock(): void {
        this.quantityStock -= 1;
    }

    getOwned(): number | null {
        return this.owned ? this.owned.getNumberPlayer() : null;
    }

    getCountryCompany(): countryCompany {
        return this.compnanyInfo.countryCompany;
    }

    getCompanyInfo(): CompanyInfo {
        return this.compnanyInfo;
    }

    getIndexCompany(): number {
        return this.indexCompany;
    }

    setMonopoly(value: boolean): void {
        this.isMonopoly = value;
    }

    setQuantityStock(value: number): void {
        this.quantityStock = value;
    }

}