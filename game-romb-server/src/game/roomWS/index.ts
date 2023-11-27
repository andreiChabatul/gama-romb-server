import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { WebSocket } from "ws";

export class ROOM_WS implements Room_WS {

    webSockets: { [id: string]: WebSocket; } = {};
    leavesPLayers: string[] = [];

    addWebSocket(idUser: string, webSocket: WebSocket): void {
        this.webSockets[idUser] = webSocket;
    }

    sendAllPlayers(action: EACTION_WEBSOCKET, payload?: {}): void {
        Object.entries(this.webSockets).forEach(([key, webSocket]) =>
            this.leavesPLayers.includes(key)
                ? ''
                : webSocket.send(JSON.stringify({ action, payload })
                ));
    }

    sendOnePlayer(idUser: string, action: EACTION_WEBSOCKET, payload?: {}): void {
        this.webSockets[idUser]
            ? this.webSockets[idUser].send(JSON.stringify({ action, payload }))
            : '';
    }

    leavePlayer(idUser: string): void {
        this.leavesPLayers.push(idUser);
    }
}
