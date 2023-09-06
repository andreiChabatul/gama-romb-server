import { ChatMessage, Player } from "src/types";

export class Chat {

    messages: ChatMessage[] = [];

    addMessage(message: string, player?: Player) {
        this.messages.push(
            {
                message,
                name: player?.name,
                numberPlayer: player?.numberPlayer
            });
    }

    returnAllMessage() {
        return this.messages;
    }

}