import { CellEmptyI, PlayerDefault, changeData, emptyCell, infoCellTurn, language } from "src/types";
import { Chat } from "src/game/chatGame/chat.room";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { TurnService } from "src/game/turn.service/turn.service";
import { DESCRIPTION_CELL_EMPTY } from "./description/description";

export class CellEmpty implements CellEmptyI {

    language: language = 'ru';
    player: PlayerDefault;

    constructor(
        private chat: Chat,
        private turnService: TurnService,
        private type: emptyCell) { }

    cellProcessing(player: PlayerDefault): void {
        this.player = player;
        this.sendInfoPLayer();
    }

    sendInfoPLayer(): void {

        const payload: infoCellTurn = {
            nameCell: this.type,
            titleCell: DESCRIPTION_CELL_EMPTY[this.language].title,
            description: '12',
            buttons: 'none'
        }


        this.player.sendMessage(EACTION_WEBSOCKET.INFO_CELL_TURN, payload);
    }

}