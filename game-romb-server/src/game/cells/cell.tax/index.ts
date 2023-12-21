import { storage_WS } from "src/game/socketStorage";
import { CellDefault, infoCellTurn } from "src/types";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { PlayerDefaultI } from "src/types/player";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class CellTax implements CellDefault {

    _cellValue: number;
    player: PlayerDefaultI;

    constructor(private _index: number, private _idRoom: string, private _nameCell: string) { }

    movePlayer(player: PlayerDefaultI): void {
        this.player = player;
        this._cellValue = Math.round(player.total * (this._nameCell === 'tax5' ? 0.05 : 0.1));
        this.sendInfoPLayer();
    }

    get index(): number {
        return this._index;
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: 'desc' + this._nameCell,
            buttons: 'pay',
            value: this._cellValue
        };
        storage_WS.sendOnePlayerGame(this._idRoom, this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {
        this.player.minusTotal(this._cellValue, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_DEBT);
    }
}