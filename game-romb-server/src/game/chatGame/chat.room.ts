import { ChatI, ChatMessage, PlayerDefaultI } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class Chat implements ChatI {

    readonly messages: ChatMessage[] = [];

    constructor(private roomWS: Room_WS) { }

    addMessage(message: string, player?: PlayerDefaultI): void {
        this.messages.push(
            {
                message,
                name: player?.name,
                color: player?.color
            });
        this.updateChat();
    }

    updateChat(): void {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_CHAT, {
            chat: this.messages.slice(0, 35)
        });
    }
}
