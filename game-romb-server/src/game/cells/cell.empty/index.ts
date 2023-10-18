import { CellEmptyI, PlayerDefaultI, PrisonI, infoCellTurn, nameCell } from "src/types";
import { Chat } from "src/game/chatGame";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { TurnService } from "src/game/turn.service";
import { DESCRIPTION_CELL_EMPTY } from "./description/description";
import { CELL_TEXT_EMPTY } from "./description/cell.text";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellEmpty implements CellEmptyI {

    language = 'ru';
    player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService,
        private nameCell: nameCell,
        private prison: PrisonI,
        private _index: number) {
    }

    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void {
        // this.chat.addMessage(changeMessage(
        //     DESCRIPTION_CELL_EMPTY[this.language].titleTurn,
        //     null,
        //     player,
        //     valueRoll) + this.type.toUpperCase());
        this.player = player;
        this.sendInfoPLayer();
        setTimeout(() => this.turnService.endTurn(), TIME_TURN_DEFAULT);
        if (this.nameCell === 'goJail') {
            this.prison.addPrisoner(player);
        };
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            nameCell: this.nameCell,
            titleCell: DESCRIPTION_CELL_EMPTY[this.language].title + this.nameCell.toUpperCase(),
            description: DESCRIPTION_CELL_EMPTY[this.language][this.nameCell],
            buttons: 'none'
        };
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    get index(): number {
        return this._index;
    }
}
