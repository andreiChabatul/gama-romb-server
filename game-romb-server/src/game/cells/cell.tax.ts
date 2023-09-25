import { CellTaxI, EACTION_WEBSOCKET, PlayerDefault, infoCellTurn, language } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { DESCRIPTION_CELL } from "./description/cell.description";

export class CellTax implements CellTaxI {

    valueTax: number;
    private chat: Chat;
    private language: language = 'en';

    constructor(valueTax: number, chat: Chat) {
        this.valueTax = valueTax;
        this.chat = chat;
    }

    cellProcessing(player: PlayerDefault): void {
        const playerTotal = player.getTotalPlayer();
        const valueTax = playerTotal * this.valueTax;

        player.getWebSocket().send(JSON.stringify(
            {
                action: EACTION_WEBSOCKET.INFO_CELL_TURN, payload: {
                    nameCell: `Tax ${this.valueTax}%`,
                    description: (DESCRIPTION_CELL[this.language].tax)
                        .replaceAll("TAX", String(valueTax))
                        .replaceAll("VALUETAX", String(this.valueTax)),
                    buttons: 'pay'
                }
            }))
    }
}