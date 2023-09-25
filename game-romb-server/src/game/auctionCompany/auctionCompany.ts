import { CellCompanyI, EACTION_WEBSOCKET, PlayersGame, infoCellTurn, language } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { AUCTION_DESCRIPTION } from "./auction.description";
import { changeMessage } from "../services/change.message";

export class AuctionCompany {

    cell: CellCompanyI;
    chat: Chat;
    players: PlayersGame;
    language: language = 'ru';

    constructor(chat: Chat, players: PlayersGame) {
        this.chat = chat;
        this.players = players;
    }

    startAuction(cell: CellCompanyI): void {
        this.cell = cell;
        const companyInfo = this.cell.getCompanyInfo();
        this.chat.addInfoMessage('startAuction', this.cell.getCompanyInfo());
        const payload: infoCellTurn = {
            nameCell: companyInfo.nameCompany,
            titleCell: changeMessage(AUCTION_DESCRIPTION[this.language].auctionTitle, companyInfo),
            description: changeMessage(AUCTION_DESCRIPTION[this.language].auctionDescBuyer, companyInfo),
            indexCompany: this.cell.getIndexCompany(),
            buttons: 'buy'
        }


        Object.keys(this.players).map((key) => {
            const player = this.players[key];
            player.getWebSocket().send(JSON.stringify(
                {
                    action: EACTION_WEBSOCKET.INFO_CELL_TURN, payload
                }))
        })


    }



}