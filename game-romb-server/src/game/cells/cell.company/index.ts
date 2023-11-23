import { AuctionI, CellCompanyI, CompanyInfo, PlayerDefaultI, PlayersGame, controlCompany, infoCellTurn, updateInfoCompany } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { EMESSAGE_CLIENT } from "src/app/const/enum";

export class CellCompany implements CellCompanyI {

    private _pledge: boolean;
    private _owned: string | null;
    private _rentIndex: number;
    private _monopoly: boolean;
    private _quantityStock: number;
    private _valueRoll: number;
    private _player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private compnanyInfo: CompanyInfo,
        private auction: AuctionI,
        private players: PlayersGame,
        private _index: number,
    ) {
        this._quantityStock = 0;
        this._monopoly = false;
    }

    movePlayer(player: PlayerDefaultI, valueRoll?: number): void {
        this._player = player;
        this._valueRoll = valueRoll;
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: '',
            buttons: 'none',
        };

        if (player.userId === this._owned) {
            payload.description = EMESSAGE_CLIENT.OWNED_COMPANY;
        } else if (this._pledge) {
            payload.description = EMESSAGE_CLIENT.PLEDGE_COMPANY;
        } else if (this._owned && player.userId !== this._owned && !this._pledge) {
            payload.description = EMESSAGE_CLIENT.RENT_COMPANY;
            payload.buttons = 'pay';
        } else if (!this._owned && player.total > this.compnanyInfo.priceCompany) {
            payload.description = EMESSAGE_CLIENT.BUY_COMPANY;
            payload.buttons = 'buy';
        } else {
            payload.description = EMESSAGE_CLIENT.AUCTION_COMPANY;
        };

        this.roomWS.sendOnePlayer(player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {

        if (this._player.userId === this._owned || this._pledge) {
            return;
        } else if (this._owned && this._player.userId !== this._owned && !this._pledge) {
            this.payRent();
        } else if (!this._owned && this._player.total > this.compnanyInfo.priceCompany) {
            this.buyCompany();
        } else {
            setTimeout(() => this.auction.startAuction(this, this._player.userId), 0);
        };
    }

    buyCompany(player: PlayerDefaultI = this._player, price: number = this.compnanyInfo.priceCompany): void {
        this._owned = player.userId;
        player.minusTotal(price, EMESSAGE_CLIENT.MINUS_TOTAL_BUY_COMPANY, this._index);
        this.compnanyInfo.countryCompany === 'ukraine' ? this._quantityStock = 1 : '';
        this.sendInfoPLayer();
    }

    payRent(): void {
        const rentDebt = this.rentCompany;
        const ownedPlayer = this.players[this.owned];
        ownedPlayer.addTotal = rentDebt;
        this._player.minusTotal(rentDebt, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_RENT);
    }

    get info(): updateInfoCompany {
        this.updateRentCompany();
        return {
            rentCompany: this.compnanyInfo.rentCompanyInfo[this._rentIndex],
            isPledge: this._pledge,
            isMonopoly: this._monopoly,
            shares: this._quantityStock,
            owned: this.owned,
        }
    }

    private updateRentCompany() {
        this._rentIndex = 0;
        if (this._monopoly) {
            this._rentIndex = 1;
            (this.compnanyInfo.countryCompany === 'ukraine') ? this._quantityStock = 2 : '';
        };
        (this.compnanyInfo.countryCompany === 'ukraine')
            ? this._rentIndex = this._quantityStock
            : this._rentIndex += this._quantityStock;
    }


    get owned(): string | null {
        return this._owned ? this._owned : null;
    }

    set owned(userId: string) {
        this._owned = userId;
        this.sendInfoPLayer();
    }

    get rentCompany(): number {
        this.updateRentCompany();
        const rentCompany = this.compnanyInfo.rentCompanyInfo[this._rentIndex];
        return this.compnanyInfo.countryCompany !== 'ukraine' ? rentCompany : rentCompany * this._valueRoll;
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
            this.sendInfoPLayer();
        };
    }

    set quantityStock(value: number) {
        this._quantityStock = value;
        this.sendInfoPLayer();
    }

    get quantityStock(): number {
        return this._quantityStock;
    }

    controlCompany(action: controlCompany, player: PlayerDefaultI): void {

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
        this.sendInfoPLayer();
    }

    sendInfoPLayer(): void {
        const payload = {
            indexCell: this._index,
            company: this.info,
        };
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_CELL, payload);
    }

}
