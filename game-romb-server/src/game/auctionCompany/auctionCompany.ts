import { CellCompanyI, PlayersGame } from "src/types";
import { Chat } from "../chatGame/chat.room";

export class ActionCompany {

    cell: CellCompanyI;
    chat: Chat;
    players: PlayersGame;

    constructor(cell: CellCompanyI, chat: Chat, players: PlayersGame) {
        this.cell = cell;
        this.chat = chat;
        this.players = players;
    }

    startAuction(): void {
        this.chat.addInfoMessage('startAuction', this.cell.getCompanyInfo());
    }



}