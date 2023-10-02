import { CellEmptyI, PlayerDefaultI, emptyCell, gameCell, infoCellTurn, language } from "src/types";
import { Chat } from "src/game/chatGame/chat.room";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { TurnService } from "src/game/turn.service/turn.service";
import { DESCRIPTION_CELL_EMPTY } from "./description/description";
import { CELL_TEXT_EMPTY } from "./description/cell.text";
import { changeMessage } from "src/game/services/change.message";

export class CellEmpty implements CellEmptyI {

    language: language = 'ru';
    player: PlayerDefaultI;

    constructor(
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService,
        private type: emptyCell,
        private indexCompany: number) {
    }

    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void {
        this.chat.addMessage(changeMessage(
            DESCRIPTION_CELL_EMPTY[this.language].titleTurn,
            null,
            player,
            valueRoll) + this.type.toUpperCase());
        this.player = player;
        this.sendInfoPLayer();
        setTimeout(() => this.turnService.endTurn(), 2000);
    }

    sendInfoPLayer(): void {
        const payload: infoCellTurn = {
            nameCell: this.type,
            titleCell: DESCRIPTION_CELL_EMPTY[this.language].title + this.type.toUpperCase(),
            description: DESCRIPTION_CELL_EMPTY[this.language][this.type],
            buttons: 'none'
        };
        this.roomWS.sendOnePlayer(this.player.userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

    sendInfoCell(): void {
        const payload: gameCell = {
            indexCell: this.indexCompany,
            cellSquare: {
                imageCell: this.type,
                textCell: CELL_TEXT_EMPTY[this.language][this.type]
            }
        }
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_CELL, payload);
    }
}
