import { CellEmptyI, PlayerDefaultI, PrisonI, infoCellTurn, nameCell } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { TurnService } from "src/game/turn.service";
import { TIME_TURN_DEFAULT } from "src/app/const";
import { infoCellButtons } from "src/types";

export class CellEmpty implements CellEmptyI {

    player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private turnService: TurnService,
        private nameCell: nameCell,
        private prison: PrisonI,
        private _index: number) {
    }

    checkPayCell(): infoCellButtons {
        return (this.nameCell === 'loss' || this.nameCell === 'tax5' || this.nameCell === 'tax10')
            ? 'pay'
            : 'none';
    }

    processing(player: PlayerDefaultI, valueRoll?: number): void {
        
    }

    movePlayer(player: PlayerDefaultI): void {
        this.player = player;
        this.sendInfoPLayer();
        this.checkPayCell() === 'none' ? setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT) : '';
        (this.nameCell === 'goJail') ? this.prison.addPrisoner(player) : '';
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            indexCompany: this._index,
            buttons: this.checkPayCell()
        };
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    get index(): number {
        return this._index;
    }
}
