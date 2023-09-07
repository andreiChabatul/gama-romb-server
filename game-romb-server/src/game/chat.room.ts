import { ChatMessage, Player } from "src/types";

export class Chat {

    private messages: ChatMessage[] = [];

    addMessage(message: string, player?: Player) {
        this.messages.push(
            {
                message,
                name: player?.name,
                numberPlayer: player?.numberPlayer
            });
    }

    getAllMessage() {
        return this.messages;
    }

}