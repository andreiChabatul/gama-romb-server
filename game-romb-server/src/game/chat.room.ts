import { ChatMessage, Player } from "src/types";

export class Chat {

    messages: ChatMessage[] = [];

    addMessage(message: string, player?: Player) {
        this.messages.push({ message, player })
    }

    returnAllMessage() {
        return this.messages;
    }

}