import { VALUE_CELL } from "src/const";
import { storage_WS } from "src/game/socketStorage";
import { CellDefault, infoCellTurn } from "src/types";
import { PlayerDefaultI } from "src/types/player";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class CellProfit implements CellDefault {

    _cellValue: number;
    _randomIndex: number;
    player: PlayerDefaultI;

    constructor(private _index: number, private _idRoom: string) { }

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
        storage_WS.sendOnePlayerGame(this._idRoom, this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {
        this.player.addTotal = this._cellValue;
    }
}