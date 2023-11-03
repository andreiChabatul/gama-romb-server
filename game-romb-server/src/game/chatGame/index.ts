import { ChatI, ChatMessage, PlayerDefaultI, SystemMessage } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class Chat implements ChatI {

    readonly messages: ChatMessage[] = [];

    constructor(private roomWS: Room_WS) { }

    addMessage(message: string, player: PlayerDefaultI): void {
        this.messages.push(
            {
                message,
                senderName: player.name,
                senderColor: player.color

            });
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
