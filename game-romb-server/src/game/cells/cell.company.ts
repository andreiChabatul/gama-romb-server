import { CellCompanyI, CompanyInfo, EACTION_WEBSOCKET, GameCellCompanyInfo, PlayerDefault, PlayersGame } from "src/types";
import { Chat } from "../chat.room";

export class CellCompany implements CellCompanyI {

    private isPledge: boolean;
    private indexCompany: number;
    private isMonopoly: boolean;
    private owned: PlayerDefault | null;
    players: PlayersGame;
    chat: Chat;
    compnanyInfo: CompanyInfo;
    private rentCompany: number = 1000;

    constructor(companyInfo: CompanyInfo, players: PlayersGame, indexCompany: number, chat: Chat) {
        this.compnanyInfo = companyInfo;
        this.indexCompany = indexCompany;
        this.players = players;
        this.chat = chat;
    }

    buyCompany(buyer: PlayerDefault): void {
        this.owned = buyer;
        this.chat.addMessage
            (`${buyer.getNamePlayer()} buy company ${this.compnanyInfo.nameCompany} for ${this.compnanyInfo.priceCompany}`)
    }

    cancelBuyCompany(): void {

        this.chat.addMessage
            (`The company ${this.compnanyInfo.nameCompany} is being put up for auction. Starting price: ${this.compnanyInfo.priceCompany}`)
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
                }
            }))
    }

    getInfoCellCompany(): GameCellCompanyInfo {
        return {
            nameCompany: this.compnanyInfo.nameCompany,
            countryCompany: this.compnanyInfo.countryCompany,
            priceCompany: this.compnanyInfo.priceCompany,
            isPledge: this.isPledge,
            owned: this.owned ? this.owned.returnNumberPlayer() : undefined,
        }
    }

}