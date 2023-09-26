import { CellProfitLossI, PlayerDefault, changeCell, changeData, language } from "src/types";
import { DATA_PROFIT } from "./data/data.profit";
import { Chat } from "src/game/chatGame/chat.room";

export class CellProfitLoss implements CellProfitLossI {

    change: changeCell;
    changeData: changeData[];
    language: language = 'ru';
    chat: Chat;

    constructor(chat: Chat, change: changeCell) {
        this.change = change;
        this.chat = chat;
    }

    cellProcessing(player: PlayerDefault): void {
        this.choiseData();
        const data = this.changeData[this.randomIndex()];
        this.chat.addMessage(player.getNamePlayer() + data.description);
    }

    choiseData(): void {

        switch (this.change) {
            case 'profit':
                this.changeData = DATA_PROFIT[this.language];
                break;

            default:
                break;
        }

    }


    private randomIndex(): number {
        return Math.floor(Math.random() * (this.changeData.length));
    }

}