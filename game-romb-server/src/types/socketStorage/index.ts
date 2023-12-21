import { WebSocket } from "ws";
import { EACTION_WEBSOCKET, myWebSocket } from "../websocket";

export interface IStorageWS {
    readonly storageWS: storageWS;
    readonly headWS: myWebSocket[];
    addWebSocketGame(idRoom: string, idUser: string, webSocket: WebSocket): void;
    sendAllPlayersGame(idRoom: string, action: EACTION_WEBSOCKET, payload?: {}): void;
    sendOnePlayerGame(idRoom: string, idUser: string, action: EACTION_WEBSOCKET, payload?: {}): void;
    leavePlayerGame(idRoom: string, idUser: string): void;
    addWebSocket(webSocket: myWebSocket): void;
    deleteWebSocket(webSocket: myWebSocket): void;
}

export type storageWS = {
    [idRoom: string]: roomWS,
};

type roomWS = {
    [idUser: string]: WebSocket
};

export type playersOffline = {
    idUser: string;
    idRoom: string;
    timer: NodeJS.Timeout;
}
