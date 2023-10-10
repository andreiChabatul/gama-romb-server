import { CellProfitLossI, GameCellSquare, PlayerDefaultI, changeCell, changeData, infoCellTurn, language } from "src/types";
import { DATA_PROFIT } from "./data/data.profit";
import { Chat } from "src/game/chatGame/chat.room";
import { DESCRIPTION_CELL } from "./description/description";
import { DATA_LOSS } from "./data/data.loss";
import { DATA_TAX5 } from "./data/data.tax5";
import { DATA_TAX10 } from "./data/data.tax10";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { TurnService } from "src/game/turn.service/turn.service";
import { CELL_TEXT } from "./description/cell.text";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellProfitLoss implements CellProfitLossI {

    changeData: changeData[];
    language: language = 'ru';
    data: changeData;
    player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService,
        private change: changeCell) { }

    cellProcessing(player: PlayerDefaultI): void {
        this.choiseData();
        this.player = player;
        this.data = this.changeData[this.randomIndex()];
        this.chat.addMessage(player.name + this.generateDescription());
        this.sendInfoPLayer();
        this.change === 'profit' ? this.addProfit() : '';
    }

    choiseData(): void {

        switch (this.change) {
            case 'profit':
                this.changeData = DATA_PROFIT[this.language];
                break;
            case 'loss':
                this.changeData = DATA_LOSS[this.language];
                break;
            case 'tax5':
                this.changeData = DATA_TAX5[this.language];
                break;
            case 'tax10':
                this.changeData = DATA_TAX10[this.language];
                break;
            default:
                break;
        };
    }

    sendInfoPLayer(): void {
        const name = (this.change === 'tax10' || this.change === 'tax5') ? 'tax' : this.change;
        const payload: infoCellTurn = {
            nameCell: name,
            titleCell: DESCRIPTION_CELL[this.language].title + name.toUpperCase(),
            description: this.generateDescription(),
            buttons: this.change === 'profit' ? 'none' : 'pay',
            descriptionTwo: this.generateDesc(),
            dept: (this.change === 'tax5' || this.change === 'tax10')
                ? this.player.total * this.data.value
                : this.data.value
        };

        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    private randomIndex(): number {
        return Math.floor(Math.random() * (this.changeData.length));
    }

    private generateDescription(): string {
        return `${(this.change === 'tax5' || this.change === 'tax10')
            ? this.data.description + this.player.total * this.data.value
            : this.data.description + this.data.value}`
    }

    private addProfit(): void {
        this.player.addTotal = this.data.value;
        setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT);
    }

    private generateDesc(): string {
        if (this.change === 'profit') {
            return null;
        };

        if (this.data.value > this.player.total) {
            return DESCRIPTION_CELL[this.language].noEnoughtMoney;
        } else {
            return DESCRIPTION_CELL[this.language].enoughtMoney;
        }
    }



    get info(): GameCellSquare {

        return {
            imageCell: (this.change === 'tax10' || this.change === 'tax5') ? 'tax' : this.change,
            textCell: CELL_TEXT[this.language][this.change]
        }
    }

}