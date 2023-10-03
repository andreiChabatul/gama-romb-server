import { CellCompanyI, CompanyInfo, PlayerDefaultI, infoCellTurn, language } from "src/types";
import { Chat } from "../../chatGame/chat.room";
import { DESCRIPTION_CELL_COMPANY } from "./description/cell.description";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { changeMessage } from "src/game/services/change.message";
import { AuctionCompany } from "src/game/auctionCompany/auctionCompany";
import { TurnService } from "src/game/turn.service/turn.service";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellCompany implements CellCompanyI {

    private _pledge: boolean;
    private _owned: string | null;
    private rentIndex: number;
    private _monopoly: boolean = true;
    private _quantityStock: number;
    private language: language = 'ru';

    constructor(
        private roomWS: Room_WS,
        private chat: Chat,
        private compnanyInfo: CompanyInfo,
        private auction: AuctionCompany,
        private turnService: TurnService,
        private indexCompany: number,
    ) {
        this._quantityStock = 0;
    }

    buyCompany(buyer: PlayerDefaultI, price?: number): void {
        this._owned = buyer.userId;
        buyer.buyCompany(price ? price : this.compnanyInfo.priceCompany);
        this.sendInfoCell();
        this.compnanyInfo.countryCompany === 'ukraine' ? this._quantityStock = 1 : '';
        this.chat.addMessage
            (`${buyer.name} buy company ${this.compnanyInfo.nameCompany} for ${price ? price : this.compnanyInfo.priceCompany}`);
    }

    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void {

        let endTurn = true;

        this.chat.addMessage(changeMessage(
            DESCRIPTION_CELL_COMPANY[this.language].titleTurn,
            this.compnanyInfo,
            player,
            valueRoll));

        const payload: infoCellTurn = {
            nameCell: this.compnanyInfo.nameCompany,
            titleCell: this.compnanyInfo.nameCompany,
            description: DESCRIPTION_CELL_COMPANY[this.language].buyCompany
                .replaceAll('PRICE', String(this.compnanyInfo.priceCompany)),
            indexCompany: this.indexCompany,
            buttons: 'none'
        };

        if (this._owned) {
            if (this._owned === player.userId) {
                payload.description = DESCRIPTION_CELL_COMPANY[this.language].owned;
            } else if (this._pledge) {
                payload.description = DESCRIPTION_CELL_COMPANY[this.language].pledgeCompany;
            } else {
                endTurn = false;
                const debt = this.compnanyInfo.rentCompanyInfo[this.rentIndex];
                payload.buttons = 'pay';
                payload.dept = debt;
                payload.receiverId = this._owned;
                payload.description = changeMessage(DESCRIPTION_CELL_COMPANY[this.language].ownedCompany, null, null, debt);
            }
        } else {
            endTurn = false;
            if (player.total < this.compnanyInfo.priceCompany) {
                this.auction.startAuction(this, player.userId);
                payload.description = DESCRIPTION_CELL_COMPANY[this.language].auctionCompany;
            } else {
                payload.buttons = 'buy';
            }
        }

        this.roomWS.sendOnePlayer(player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
        endTurn ? setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT) : '';
    }

    sendInfoCell(): void {
        this.updateRentCompany();

        const payload = {
            indexCell: this.indexCompany,
            cellCompany: {
                nameCompany: this.compnanyInfo.nameCompany,
                countryCompany: this.compnanyInfo.countryCompany,
                priceCompany: this.compnanyInfo.priceCompany,
                rentCompany: this.compnanyInfo.rentCompanyInfo[this.rentIndex],
                isPledge: this._pledge,
                priceStock: this.compnanyInfo.priceStock,
                isMonopoly: this._monopoly,
                shares: this._quantityStock,
                owned: this.owned,
            }
        };

        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_CELL, payload);
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

    buyStock(player: PlayerDefaultI): void {
        this._quantityStock += 1;
        player.buyStock(this.compnanyInfo.priceStock, this.compnanyInfo.nameCompany);
    }

    sellStock(): void {
        this._quantityStock -= 1;
    }

    get owned(): string | null {
        return this._owned ? this._owned : null;
    }

    get infoCompany(): CompanyInfo {
        return this.compnanyInfo;
    }

    get index(): number {
        return this.indexCompany;
    }

    set monopoly(value: boolean) {
        this._monopoly = value;
        this.sendInfoCell();
    }

    set quantityStock(value: number) {
        this._quantityStock = value;
        this.sendInfoCell();
    }

}