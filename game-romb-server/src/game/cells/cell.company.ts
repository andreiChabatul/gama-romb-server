import { CellCompanyI, CompanyInfo, EACTION_WEBSOCKET, GameCellCompanyInfo, PlayerDefault, PlayersGame, countryCompany, countryCompanyMonopoly } from "src/types";
import { Chat } from "../chat.room";
import { AUCTION_STEP, TIME_BUY_COMPANY, TIME_TURN_DEFAULT } from "src/app/const";

export class CellCompany implements CellCompanyI {

    private isPledge: boolean;
    private indexCompany: number;
    private owned: PlayerDefault | null;
    players: PlayersGame;
    chat: Chat;
    compnanyInfo: CompanyInfo;
    private auctionPrice: number;
    private auctionWinner: PlayerDefault;
    private isAuction: boolean;
    private rentIndex: number;
    private isMonopoly: boolean;
    private quantityStock: number;

    constructor(companyInfo: CompanyInfo, players: PlayersGame, indexCompany: number, chat: Chat) {
        this.compnanyInfo = companyInfo;
        this.indexCompany = indexCompany;
        this.players = players;
        this.chat = chat;
        this.rentIndex = 0;
        this.quantityStock = 0;
    }

    buyCompany(buyer: PlayerDefault, price?: number): void {
        this.owned = buyer;
        buyer.buyCompany(price ? price : this.compnanyInfo.priceCompany);
        this.chat.addMessage
            (`${buyer.getNamePlayer()} buy company ${this.compnanyInfo.nameCompany} for ${price ? price : this.compnanyInfo.priceCompany}`);
    }

    cancelBuyCompany(): void {
        this.chat.addMessage
            (`The company ${this.compnanyInfo.nameCompany} is being put up for auction. Starting price: ${this.compnanyInfo.priceCompany}`);
        this.auctionCompany();
    }

    private auctionCompany() {
        this.startAuction();
        this.auctionPrice
            ? this.auctionPrice *= AUCTION_STEP
            : this.auctionPrice = this.compnanyInfo.priceCompany * AUCTION_STEP;

        Object.keys(this.players).map((key) => {
            const player = this.players[key];
            if (player.getTotalPlayer() >= this.auctionPrice) {
                this.sellCompany(player);
            }
        })
    }

    auctionStep(player: PlayerDefault) {
        this.auctionWinner = player;
        this.auctionCompany();
    }

    auctionEnd(): void {
        if (this.isAuction) {
            if (this.auctionWinner) {
                this.buyCompany(this.auctionWinner, Math.round(this.auctionPrice));
            } else {
                this.chat.addMessage(`the auction for the company ${this.compnanyInfo.nameCompany} did not take place`);
            }
            this.isAuction = false;
        }
    }


    cellProcessing(player: PlayerDefault): number {

        if (this.owned && this.owned !== player) {
            this.owned.enrollRentCompany(this.compnanyInfo.rentCompanyInfo[this.rentIndex]);
            player.payRentCompany(this.compnanyInfo.rentCompanyInfo[this.rentIndex]);
            return TIME_TURN_DEFAULT;
        }
        else if (this.owned === player) { return; }
        else {
            if (this.compnanyInfo.priceCompany >= player.getTotalPlayer()) {
                this.auctionCompany();
            } else {
                this.sellCompany(player);
            }
        }
        return TIME_BUY_COMPANY;
    }

    private sellCompany(player: PlayerDefault): void {
        player.getWebSocket().send(JSON.stringify(
            {
                action: EACTION_WEBSOCKET.SELL_COMPANY, payload: {
                    ...this.compnanyInfo,
                    indexCompany: this.indexCompany,
                    auctionPrice: Math.round(this.auctionPrice),
                    isAuction: this.isAuction,
                    auctionWinner: this.auctionWinner ? this.auctionWinner.getNamePlayer() : '...'
                }
            }))
    }

    private startAuction(): void {
        if (!this.isAuction) {
            this.auctionPrice = 0;
            this.auctionWinner = undefined;
            this.isAuction = true;
        }
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
            shares: [],
            owned: this.owned ? this.owned.getNumberPlayer() : undefined,
        }
    }


    private updateRentCompany() {
        if (this.isMonopoly) { this.rentIndex = 1 }
        this.rentIndex += this.quantityStock;
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

    setMonopoly(value: boolean): void {
        this.isMonopoly = value;
    }

}