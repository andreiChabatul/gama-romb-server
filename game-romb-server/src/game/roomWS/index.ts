import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { WebSocket } from "ws";

export class ROOM_WS implements Room_WS {

    webSockets: { [id: string]: WebSocket; } = {};

    addWebSocket(idUser: string, webSocket: WebSocket): void {
        this.webSockets[idUser] = webSocket;
    }

    sendAllPlayers(action: EACTION_WEBSOCKET, payload?: {}): void {
        Object.values(this.webSockets).forEach((webSocket) =>
            webSocket.send(JSON.stringify({ action, payload })
            ));
    }

    sendOnePlayer(idUser: string, action: EACTION_WEBSOCKET, payload?: {}): void {
        this.webSockets[idUser]
            ? this.webSockets[idUser].send(JSON.stringify({ action, payload }))
            : '';
    }

    leavePlayer(idUser: string): void {
        delete this.webSockets[idUser];
    }
}
