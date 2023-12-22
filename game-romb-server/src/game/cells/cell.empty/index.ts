import { storage_players } from "src/game/playerStorage";
import { storage_WS } from "src/game/socketStorage";
import { CellDefault, infoCellTurn } from "src/types";
import { PlayerDefaultI, PrisonI } from "src/types/player";
import { EACTION_WEBSOCKET } from "src/types/websocket";


export class CellEmpty implements CellDefault {

    player: PlayerDefaultI;

    constructor(
        private _index: number,
        private _idRoom: string,
        private _nameCell: string,
        private prison: PrisonI) { }

    movePlayer(idUser: string): void {
        this.player = storage_players.getPlayer(this._idRoom, idUser);
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
        storage_WS.sendOnePlayerGame(this._idRoom, this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    activateCell(): void {
        this._nameCell === 'goJail' ? this.prison.addPrisoner(this.player) : '';
        this.player && this.player.prison && this._nameCell === 'inJail' ? this.prison.payDebt(this.player) : '';
    }
}