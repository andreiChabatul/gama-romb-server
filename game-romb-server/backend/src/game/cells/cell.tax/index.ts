import { storage_players } from "src/game/playerStorage";
import { storage_WS } from "src/game/socketStorage";
import { infoCellTurn } from "src/types";
import { CellDefault } from "src/types/cellsServices";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class CellTax implements CellDefault {

    _cellValue: number;

    constructor(private _index: number, private _idRoom: string, private _nameCell: string) { }

    movePlayer(idUser: string): void {
        const playerTotal = storage_players.getPlayer(this._idRoom, idUser).total;
        this._cellValue = Math.round(playerTotal * (this._nameCell === 'tax5' ? 0.05 : 0.1));
        this.sendInfoPlayer(idUser);
    }

    get index(): number {
        return this._index;
    }

    sendInfoPlayer(idUser: string): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: 'desc' + this._nameCell,
            buttons: 'pay',
            value: this._cellValue
        };
        storage_WS.sendOnePlayerGame(this._idRoom, idUser, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(idUser: string): void {
        const player = storage_players.getPlayer(this._idRoom, idUser);
        player.minusTotal(this._cellValue, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_DEBT);
    }
}