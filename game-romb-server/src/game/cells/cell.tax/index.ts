import { EMESSAGE_CLIENT } from "src/app/const/enum";
import { CellDefault, PlayerDefaultI, infoCellTurn } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class CellTax implements CellDefault {

    _cellValue: number;
    player: PlayerDefaultI;

    constructor(private _index: number, private _nameCell: string, private roomWS: Room_WS) { }

    movePlayer(player: PlayerDefaultI): void {
        console.log('23')
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
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {
        this.player.minusTotal(this._cellValue, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_DEBT);
    }
}