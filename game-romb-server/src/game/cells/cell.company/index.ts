import { CompanyInfo, controlCompany, infoCellTurn, updateInfoCompany, countryCompany } from "src/types";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "src/game/socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { PlayerDefaultI } from "src/types/player";
import { storage_players } from "src/game/playerStorage";
import { CellCompanyI } from "src/types/cellsServices";

export class CellCompany implements CellCompanyI {

    private _pledge: boolean;
    private _owned: string | undefined;
    private _monopoly: boolean;
    private _quantityStock: number;
    private _valueRoll: number;

    constructor(
        private _index: number,
        private _idRoom: string,
        private compnanyInfo: CompanyInfo,
        private updateMonopoly: (countryCompany: countryCompany) => void
    ) {
        this._quantityStock = 0;
        this._monopoly = false;
    }

    movePlayer(idUser: string, valueRoll?: number): void {
        const player = storage_players.getPlayer(this._idRoom, idUser);
        this._valueRoll = valueRoll;
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: '',
            buttons: 'none',
        };

        if (idUser === this._owned) {
            payload.description = EMESSAGE_CLIENT.OWNED_COMPANY;
        } else if (this._pledge) {
            payload.description = EMESSAGE_CLIENT.PLEDGE_COMPANY;
        } else if (this._owned && idUser !== this._owned && !this._pledge) {
            payload.description = EMESSAGE_CLIENT.RENT_COMPANY;
            payload.buttons = 'pay';
        } else if (!this._owned && player.total > this.compnanyInfo.priceCompany) {
            payload.description = EMESSAGE_CLIENT.BUY_COMPANY;
            payload.buttons = 'buy';
        } else {
            payload.description = EMESSAGE_CLIENT.AUCTION_COMPANY;
            payload.buttons = 'auction';
        };

        storage_WS.sendOnePlayerGame(this._idRoom, idUser, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(idUser: string): void {
        const player = storage_players.getPlayer(this._idRoom, idUser);
        if (idUser === this._owned || this._pledge || player.bankrupt) {
            return;
        } else if (this._owned && idUser !== this._owned && !this._pledge) {
            this.payRent(idUser);
        } else if (!this._owned && player.total > this.compnanyInfo.priceCompany) {
            this.buyCompany(player);
        };
    }

    buyCompany(player: PlayerDefaultI, price: number = this.compnanyInfo.priceCompany): void {
        this.owned = player.userId;
        player.minusTotal(price, EMESSAGE_CLIENT.MINUS_TOTAL_BUY_COMPANY, this._index);
        this.sendInfoPlayer();
    }

    payRent(idUser: string): void {
        const payer = storage_players.getPlayer(this._idRoom, idUser)
        const owned = storage_players.getPlayer(this._idRoom, this._owned);
        const debtRent = this.rentCompany >= payer.capital ? payer.capital : this.rentCompany;
        owned.addTotal = debtRent;
        payer.minusTotal(debtRent, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_RENT);
    }

    get info(): updateInfoCompany {
        return {
            rentCompany: this.rentCompany,
            isPledge: this._pledge,
            isMonopoly: this._monopoly,
            shares: this._quantityStock,
            owned: this.owned,
        }
    }

    get rentCompany(): number {
        const rentIndex = Number(this._monopoly) + this._quantityStock;
        return this.compnanyInfo.rentCompanyInfo[rentIndex];
    }

    get owned(): string | undefined {
        return this._owned ? this._owned : undefined;
    }

    set owned(userId: string) {
        this._owned = userId;
        this.updateMonopoly(this.compnanyInfo.countryCompany);
        this.sendInfoPlayer();
    }

    get infoCompany(): CompanyInfo {
        return this.compnanyInfo;
    }

    get index(): number {
        return this._index;
    }

    get pledge(): boolean {
        return this._pledge;
    }

    set monopoly(value: boolean) {
        if (value !== this._monopoly) {
            this._monopoly = value;
            this.sendInfoPlayer();
        };
    }

    set quantityStock(value: number) {
        this._quantityStock = value;
        this.sendInfoPlayer();
    }

    get quantityStock(): number {
        return this._quantityStock;
    }

    controlCompany(action: controlCompany, idUser: string): void {
        const player = storage_players.getPlayer(this._idRoom, idUser);
        switch (action) {
            case 'buyStock':
                this._quantityStock += 1;
                player.minusTotal(this.compnanyInfo.priceStock);
                break;
            case 'sellStock':
                this._quantityStock -= 1;
                player.addTotal = this.compnanyInfo.priceStock;
                break;
            case 'pledgeCompany':
                this._pledge = true;
                player.addTotal = this.compnanyInfo.collateralCompany;
                break;
            case 'buyOutCompany':
                this._pledge = false;
                player.minusTotal(this.compnanyInfo.buyBackCompany);
                break;
            default:
                break;
        };
        this.sendInfoPlayer();
    }

    sendInfoPlayer(idUser?: string): void {
        const payload = {
            indexCell: this._index,
            company: this.info,
        };
        idUser
            ? storage_WS.sendOnePlayerGame(this._idRoom, idUser, EACTION_WEBSOCKET.UPDATE_CELL, payload)
            : storage_WS.sendAllPlayersGame(this._idRoom, EACTION_WEBSOCKET.UPDATE_CELL, payload);
    }

}
