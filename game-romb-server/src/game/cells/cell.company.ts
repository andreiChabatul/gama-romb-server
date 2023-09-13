import { CellCompanyI, CompanyInfo, EACTION_WEBSOCKET, GameCellCompanyInfo, PlayerDefault, PlayersGame } from "src/types";
import { Chat } from "../chat.room";
import { AUCTION_STEP } from "src/app/const";

export class CellCompany implements CellCompanyI {

    private isPledge: boolean;
    private indexCompany: number;
    private isMonopoly: boolean;
    private owned: PlayerDefault | null;
    players: PlayersGame;
    chat: Chat;
    compnanyInfo: CompanyInfo;
    private rentCompany: number = 1000;
    private auctionPrice: number;
    private auctionWinner: PlayerDefault;
    private isAuction: boolean;

    constructor(companyInfo: CompanyInfo, players: PlayersGame, indexCompany: number, chat: Chat) {
        this.compnanyInfo = companyInfo;
        this.indexCompany = indexCompany;
        this.players = players;
        this.chat = chat;
    }

    buyCompany(buyer: PlayerDefault, price?: number): void {
        this.owned = buyer;
        this.chat.addMessage
            (`${buyer.getNamePlayer()} buy company ${this.compnanyInfo.nameCompany} for ${price ? price : this.compnanyInfo.priceCompany}`)
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


    cellProcessing(player: PlayerDefault): void {
        if (this.owned) {
            console.log('rent');
        } else {
            this.sellCompany(player);
        }
    }

    private sellCompany(player: PlayerDefault): void {
        player.getWebSocket().send(JSON.stringify(
            {
                action: EACTION_WEBSOCKET.SELL_COMPANY, payload: {
                    ...this.compnanyInfo,
                    indexCompany: this.indexCompany,
                    rentCompany: this.rentCompany,
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
        return {
            nameCompany: this.compnanyInfo.nameCompany,
            countryCompany: this.compnanyInfo.countryCompany,
            priceCompany: this.compnanyInfo.priceCompany,
            isPledge: this.isPledge,
            owned: this.owned ? this.owned.getNumberPlayer() : undefined,
        }
    }

}