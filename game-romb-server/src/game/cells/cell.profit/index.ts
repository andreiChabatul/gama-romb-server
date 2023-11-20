import { VALUE_CELL } from "src/app/const";
import { CellDefault, PlayerDefaultI, infoCellTurn } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class CellProfit implements CellDefault {

    _cellValue: number;
    _randomIndex: number;
    player: PlayerDefaultI;

    constructor(private _index: number, private roomWS: Room_WS) { }

    movePlayer(player: PlayerDefaultI): void {
        this.player = player;
        this._randomIndex = Math.floor(Math.random() * VALUE_CELL.length)
        this._cellValue = VALUE_CELL[this._randomIndex];
        this.sendInfoPLayer();
    }

    get index(): number {
        return this._index;
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: 'descprofit' + this._randomIndex,
            buttons: 'none',
            value: this._cellValue
        };
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {
        this.player.addTotal = this._cellValue;
    }
}