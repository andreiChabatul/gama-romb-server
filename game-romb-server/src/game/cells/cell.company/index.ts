import { CellCompanyI, CompanyInfo, PlayerDefaultI, controlCompany, infoCellButtons } from "src/types";
import { Chat } from "../../chatGame";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { AuctionCompany } from "src/game/auctionCompany";
import { TurnService } from "src/game/turn.service";
import { GameCellCompanyInfo } from "src/types";
import { EMESSAGE_CLIENT } from "src/app/const/enum";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellCompany implements CellCompanyI {

    private _pledge: boolean;
    private _owned: string | null;
    private rentIndex: number;
    private _monopoly: boolean;
    private _quantityStock: number;

    constructor(
        private roomWS: Room_WS,
        private chat: Chat,
        private compnanyInfo: CompanyInfo,
        private auction: AuctionCompany,
        private turnService: TurnService,
        private indexCompany: number,
    ) {
        this._quantityStock = 0;
        this._monopoly = false;
    }

    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void {

        let buttons: infoCellButtons = 'none';
        let description: string;

        if (player.userId === this._owned) {
            description = EMESSAGE_CLIENT.OWNED_COMPANY;
            setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT);
        } else if (this._pledge) {
            description = EMESSAGE_CLIENT.PLEDGE_COMPANY;
            setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT);
        } else if (this._owned && player.userId !== this._owned && !this._pledge) {
            description = EMESSAGE_CLIENT.RENT_COMPANY;
            buttons = 'payRent';
        } else if (!this._owned && player.total > this.compnanyInfo.priceCompany) {
            description = EMESSAGE_CLIENT.BUY_COMPANY;
            buttons = 'buy';
        } else {
            description = EMESSAGE_CLIENT.AUCTION_COMPANY;
            setTimeout(() => this.auction.startAuction(this, player.userId), TIME_TURN_DEFAULT);
        };

        this.roomWS.sendOnePlayer(player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, {
            indexCompany: this.indexCompany,
            buttons,
            description
        });
    }

    updateInfoCompany(): void {
        this.updateRentCompany();

        const payload = {
            indexCell: this.indexCompany,
            cellCompany: {
                rentCompany: this.compnanyInfo.rentCompanyInfo[this.rentIndex],
                isPledge: this._pledge,
                isMonopoly: this._monopoly,
                shares: this._quantityStock,
                owned: this.owned,
            }
        };

        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_CELL, payload);
    }

    get info(): GameCellCompanyInfo {
        return {
            countryCompany: this.compnanyInfo.countryCompany,
            priceCompany: this.compnanyInfo.priceCompany,
            collateralCompany: this.compnanyInfo.collateralCompany,
            rentCompany: this.compnanyInfo.rentCompanyInfo[this.rentIndex],
            isPledge: this._pledge,
            buyBackCompany: this.compnanyInfo.buyBackCompany,
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


    get owned(): string | null {
        return this._owned ? this._owned : null;
    }

    get rentCompany(): number {
        this.updateRentCompany();
        return this.compnanyInfo.rentCompanyInfo[this.rentIndex]
    }

    get infoCompany(): CompanyInfo {
        return this.compnanyInfo;
    }

    get index(): number {
        return this.indexCompany;
    }

    set monopoly(value: boolean) {
        if (value !== this._monopoly) {
            this._monopoly = value;
            this.updateInfoCompany();
        };
    }

    set quantityStock(value: number) {
        this._quantityStock = value;
        this.updateInfoCompany();
    }


    controlCompany(action: controlCompany, player: PlayerDefaultI, price?: number): void {

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
                player.minusTotal(this.compnanyInfo.collateralCompany);
                break;
            case 'buyCompany':
                this._owned = player.userId;
                player.minusTotal(price ? price : this.compnanyInfo.priceCompany, EMESSAGE_CLIENT.MINUS_TOTAL_BUY_COMPANY, this.indexCompany);
                this.compnanyInfo.countryCompany === 'ukraine' ? this._quantityStock = 1 : '';
                this.turnService.endTurn();
                break;
            case 'startAuction':
                this.auction.startAuction(this, player.userId);
                break;
            case 'stepAuction':
                this.auction.stepAuction(player);
                break;
            case 'leaveAuction':
                this.auction.leaveAuction(player);
                break;
            default:
                break;
        };
        this.updateInfoCompany();
    }

}