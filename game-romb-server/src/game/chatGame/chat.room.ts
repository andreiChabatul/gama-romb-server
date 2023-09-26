import { ChatMessage, EACTION_WEBSOCKET, Player, PlayersGame } from "src/types";

export class Chat {

    private messages: ChatMessage[] = [];
    players: PlayersGame;

    constructor(players: PlayersGame) {
        this.players = players;
    }

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
