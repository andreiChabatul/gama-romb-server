import { VALUE_CELL } from "src/const";
import { storage_players } from "src/game/playerStorage";
import { storage_WS } from "src/game/socketStorage";
import { infoCellTurn } from "src/types";
import { CellDefault } from "src/types/cellsServices";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class CellProfit implements CellDefault {

    _cellValue: number;
    _randomIndex: number;

    constructor(private _index: number, private _idRoom: string) { }

    movePlayer(idUser: string): void {
        this._randomIndex = Math.floor(Math.random() * VALUE_CELL.length)
        this._cellValue = VALUE_CELL[this._randomIndex];
        this.sendInfoPlayer(idUser);
    }

    get index(): number {
        return this._index;
    }

    sendInfoPlayer(idUser: string): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: 'descprofit' + this._randomIndex,
            buttons: 'none',
            value: this._cellValue
        };
        storage_WS.sendOnePlayerGame(this._idRoom, idUser, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(idUser: string): void {
        const player = storage_players.getPlayer(this._idRoom, idUser);
        player.addTotal = this._cellValue;
    }
}