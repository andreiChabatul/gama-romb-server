import { CellCompanyI, CompanyInfo, GameCellCompanyInfo, PlayerDefault, PlayersGame, countryCompany, infoCellTurn, language } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { DESCRIPTION_CELL_COMPANY } from "./description/cell.description";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class CellCompany implements CellCompanyI {

    private isPledge: boolean;
    private _owned: PlayerDefault | null;
    private rentIndex: number;
    private _monopoly: boolean;
    private _quantityStock: number;
    private language: language = 'ru';

    constructor(
        private chat: Chat,
        private compnanyInfo: CompanyInfo,
        private indexCompany: number) {
        this._quantityStock = 0;
    }

    buyCompany(buyer: PlayerDefault, price?: number): void {
        this._owned = buyer;
        buyer.buyCompany(price ? price : this.compnanyInfo.priceCompany);
        this.compnanyInfo.countryCompany === 'ukraine' ? this._quantityStock = 1 : '';
        this.chat.addMessage
            (`${buyer.name} buy company ${this.compnanyInfo.nameCompany} for ${price ? price : this.compnanyInfo.priceCompany}`);
    }

    cellProcessing(player: PlayerDefault, valueRoll?: number): void {

        const payload: infoCellTurn = {
            nameCell: this.compnanyInfo.nameCompany,
            titleCell: this.compnanyInfo.nameCompany,
            description: DESCRIPTION_CELL_COMPANY[this.language].buyCompany
                .replaceAll('PRICE', String(this.compnanyInfo.priceCompany)),
            indexCompany: this.indexCompany,
            buttons: 'buy'
        }

        player.sendMessage(EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
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
            isMonopoly: this._monopoly,
            shares: this._quantityStock,
            owned: this.owned,
        }
    }

    private updateRentCompany() {
        this.rentIndex = 0;
        if (this._monopoly) {
            this.rentIndex = 1;
            (this.compnanyInfo.countryCompany === 'ukraine') ? this._quantityStock = 2 : '';
        };
        (this.compnanyInfo.countryCompany === 'ukraine')
            ? this.rentIndex = this._quantityStock
            : this.rentIndex += this._quantityStock;
    }

    buyStock(player: PlayerDefault): void {
        this._quantityStock += 1;
        player.buyStock(this.compnanyInfo.priceStock, this.compnanyInfo.nameCompany);
    }

    sellStock(): void {
        this._quantityStock -= 1;
    }

    get owned(): number | null {
        return this._owned ? this._owned.playerNumber : null;
    }

    get info(): CompanyInfo {
        return this.compnanyInfo;
    }

    get index(): number {
        return this.indexCompany;
    }

    set monopoly(value: boolean) {
        this._monopoly = value;
    }

    set quantityStock(value: number) {
        this._quantityStock = value;
    }

}