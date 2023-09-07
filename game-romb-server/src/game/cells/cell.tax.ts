import { CellTaxI, PlayerDefault } from "src/types";
import { Chat } from "../chat.room";

export class CellTax implements CellTaxI {

    valueTax: number;
    private chat: Chat;

    constructor(valueTax: number, chat: Chat) {
        this.valueTax = valueTax;
        this.chat = chat;
    }

    cellProcessing(player: PlayerDefault): void {
        const playerTotal = player.getTotalPlayer();
        const valueTax = playerTotal * this.valueTax;
        player.setTotalPlayer(playerTotal - valueTax);
        this.chat.addMessage(
            `Checking the tax authorities, ${player.getNamePlayer()} pays an additional tax: ${valueTax}`
        )
    }

}