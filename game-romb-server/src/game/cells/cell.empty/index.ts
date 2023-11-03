import { CellEmptyI, PlayerDefaultI, PrisonI, infoCellTurn, nameCell } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { TurnService } from "src/game/turn.service";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellEmpty implements CellEmptyI {

    player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private turnService: TurnService,
        private nameCell: nameCell,
        private prison: PrisonI,
        private _index: number) {
    }

    private checkPayCell(): boolean {
        return (this.nameCell === 'loss' || this.nameCell === 'tax5' || this.nameCell === 'tax10')
            ? true
            : false;
    }

    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void {
        this.player = player;
        this.sendInfoPLayer();
        this.checkPayCell() ? '' : setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT);
        (this.nameCell === 'goJail') ? this.prison.addPrisoner(player) : '';
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            buttons: this.checkPayCell() ? 'pay' : 'none'
        };
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    get index(): number {
        return this._index;
    }
}
