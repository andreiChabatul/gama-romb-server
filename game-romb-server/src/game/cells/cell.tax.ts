import { CellTaxI, PlayerDefault } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { TIME_TURN_DEFAULT } from "src/app/const";

export class CellTax implements CellTaxI {

    valueTax: number;
    private chat: Chat;

    constructor(valueTax: number, chat: Chat) {
        this.valueTax = valueTax;
        this.chat = chat;
    }

    cellProcessing(player: PlayerDefault): number {
        const playerTotal = player.getTotalPlayer();
        const valueTax = playerTotal * this.valueTax;
        player.setTotalPlayer(playerTotal - valueTax);
        this.chat.addMessage(
            `Checking the tax authorities, ${player.getNamePlayer()} pays an additional tax: ${valueTax}`
        )
        return TIME_TURN_DEFAULT;
    }

    async cellEndProcessing(): Promise<boolean> {
        return new Promise(() => true)
    }
    

}