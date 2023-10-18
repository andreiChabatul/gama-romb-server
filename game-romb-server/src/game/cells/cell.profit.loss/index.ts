import { CellProfitLossI, PlayerDefaultI, changeData, infoCellTurn, nameCell } from "src/types";
import { DATA_PROFIT } from "./data/data.profit";
import { Chat } from "src/game/chatGame";
import { DESCRIPTION_CELL } from "./description/description";
import { DATA_LOSS } from "./data/data.loss";
import { DATA_TAX5 } from "./data/data.tax5";
import { DATA_TAX10 } from "./data/data.tax10";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { TurnService } from "src/game/turn.service";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellProfitLoss implements CellProfitLossI {

    changeData: changeData[];
    data: changeData;
    player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService,
        private nameCell: nameCell,
        private _index: number) { }

    cellProcessing(player: PlayerDefaultI): void {
        this.choiseData();
        this.player = player;
        this.data = this.changeData[this.randomIndex()];
        // this.chat.addMessage(player.name + this.generateDescription());
        this.sendInfoPLayer();
        this.nameCell === 'profit' ? this.addProfit() : '';
    }

    choiseData(): void {

        switch (this.nameCell) {
            case 'profit':
                this.changeData = DATA_PROFIT.en;
                break;
            case 'loss':
                this.changeData = DATA_LOSS.en;
                break;
            case 'tax5':
                this.changeData = DATA_TAX5.en;
                break;
            case 'tax10':
                this.changeData = DATA_TAX10.en;
                break;
            default:
                break;
        };
    }

    sendInfoPLayer(): void {
        const name = (this.nameCell === 'tax10' || this.nameCell === 'tax5') ? 'tax' : this.nameCell;
        const payload: infoCellTurn = {
            nameCell: name,
            titleCell: DESCRIPTION_CELL.en.title + name.toUpperCase(),
            description: this.generateDescription(),
            buttons: this.nameCell === 'profit' ? 'none' : 'pay',
            descriptionTwo: this.generateDesc(),
            dept: (this.nameCell === 'tax5' || this.nameCell === 'tax10')
                ? this.player.total * this.data.value
                : this.data.value
        };

        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    private randomIndex(): number {
        return Math.floor(Math.random() * (this.changeData.length));
    }

    private generateDescription(): string {
        return `${(this.nameCell === 'tax5' || this.nameCell === 'tax10')
            ? this.data.description + this.player.total * this.data.value
            : this.data.description + this.data.value}`
    }

    private addProfit(): void {
        this.player.addTotal = this.data.value;
        setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT);
    }

    private generateDesc(): string {
        if (this.nameCell === 'profit') {
            return null;
        };

        if (this.data.value > this.player.total) {
            return DESCRIPTION_CELL['en'].noEnoughtMoney;
        } else {
            return DESCRIPTION_CELL['en'].enoughtMoney;
        }
    }


    get index(): number {
        return this._index
    }

}