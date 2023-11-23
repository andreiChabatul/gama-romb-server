import { CellDefault, PlayerDefaultI, PrisonI, infoCellTurn } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";


export class CellEmpty implements CellDefault {

    player: PlayerDefaultI;

    constructor(private _index: number, private _nameCell: string, private roomWS: Room_WS, private prison: PrisonI) { }

    movePlayer(player: PlayerDefaultI): void {
        this.player = player;
        this.sendInfoPLayer();
    }

    get index(): number {
        return this._index;
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            description: this._nameCell + 'Desc',
            buttons: 'none',
        };
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {
        this._nameCell === 'goJail' ? this.prison.addPrisoner(this.player) : '';
        this.player && this.player.prison && this._nameCell === 'inJail' ? this.prison.payDebt(this.player) : '';
    }
}