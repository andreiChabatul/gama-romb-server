import { ChatMessage, Player, PlayersGame } from "src/types";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { PlayerDefault } from "../player";

export class Chat {

    private messages: ChatMessage[] = [];

    constructor(private players: PlayersGame) { }

    addMessage(message: string, idUser?: string) {
        const player = this.players[idUser];
        this.messages.push(
            {
                message,
                name: player?.name,
                numberPlayer: player?.playerNumber
            });
        this.updateChat();
    }

    private updateChat(): void {
        Object.keys(this.players).map(
            (key) => this.players[key].sendMessage(EACTION_WEBSOCKET.UPDATE_CHAT, {
                chat: this.messages.slice(0, 35)
            }))
    }
}
