import { ChatMessage, Player, PlayersGame } from "src/types";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class Chat {

    private messages: ChatMessage[] = [];

    constructor(private players: PlayersGame) { }

    addMessage(message: string, player?: Player) {
        this.messages.push(
            {
                message,
                name: player?.name,
                numberPlayer: player?.numberPlayer
            });
        this.updateChat();
    }

    private updateChat(): void {
        Object.keys(this.players).map((key) => this.players[key].webSocket.
            send(JSON.stringify(
                {
                    action: EACTION_WEBSOCKET.UPDATE_CHAT,
                    payload: {
                        chat: this.messages.slice(0, 35)
                    },
                })))
    }

}
