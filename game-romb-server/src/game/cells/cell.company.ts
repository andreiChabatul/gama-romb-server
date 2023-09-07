import { CellCompanyI, CompanyInfo, EACTION_WEBSOCKET, GameCellCompanyInfo, PlayerDefault } from "src/types";
import { WebSocket } from "ws";


export class CellCompany implements CellCompanyI {

    private isPledge: boolean;
    private indexCompany: number;
    private isMonopoly: boolean;
    private owned: PlayerDefault | null;
    webSockets: WebSocket[] = [];
    compnanyInfo: CompanyInfo;

    constructor(companyInfo: CompanyInfo, webSockets: WebSocket[], indexCompany: number) {
        this.compnanyInfo = companyInfo;
        this.indexCompany = indexCompany;
        this.webSockets = webSockets;
    }

    buyCompany(buyer: PlayerDefault): void {
        this.owned = buyer;
    }

    cellProcessing(player: PlayerDefault): void {
        if (this.owned) {
            console.log('rent');
        } else {

            this.webSockets.map((client) =>
                client.send(JSON.stringify({
                    action: EACTION_WEBSOCKET.AUCTION_COMPANY, payload: {
                        ...this.compnanyInfo,
                        indexCompany: this.indexCompany,
                        auction: false
                    }
                })))
        }
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