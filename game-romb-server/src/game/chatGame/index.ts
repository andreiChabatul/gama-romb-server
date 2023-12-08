import { ChatI, chatMessage, SystemMessage } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class Chat implements ChatI {

    readonly messages: chatMessage[] = [];

    constructor(private roomWS: Room_WS) { }

    addMessage(message: string, senderId: string): void {
        this.messages.push({ message, senderId });
        this.updateChat();
    }

    addSystemMessage(systemMessage: SystemMessage): void {
        this.messages.push(systemMessage);
        this.updateChat();
    }

    updateChat(): void {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_CHAT, {
            chat: this.messages[this.messages.length - 1]
        });
    }
}
