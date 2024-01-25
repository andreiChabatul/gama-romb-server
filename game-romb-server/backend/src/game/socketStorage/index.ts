import { IStorageWS, storageWS } from 'src/types/socketStorage';
import { EACTION_WEBSOCKET, myWebSocket } from 'src/types/websocket';
import { WebSocket } from 'ws';

export class StorageWS implements IStorageWS {
  readonly storageWS: storageWS = {};
  readonly headWS: myWebSocket[] = [];

  addWebSocketGame(idRoom: string, idUser: string, webSocket: WebSocket): void {
    this.storageWS[idRoom] = {
      ...this.storageWS[idRoom],
      [idUser]: webSocket,
    };
  }

  sendAllPlayersGame(
    idRoom: string,
    action: EACTION_WEBSOCKET,
    payload?: {} | string,
  ): void {
    if (this.storageWS[idRoom]) {
      Object.values(this.storageWS[idRoom]).map((webSocket: WebSocket) =>
        webSocket.send(JSON.stringify({ action, payload })),
      );
    }
  }

  sendOnePlayerGame(
    idRoom: string,
    idUser: string,
    action: EACTION_WEBSOCKET,
    payload?: {},
  ): void {
    this.storageWS[idRoom] && this.storageWS[idRoom][idUser]
      ? this.storageWS[idRoom][idUser].send(JSON.stringify({ action, payload }))
      : '';
  }

  leavePlayerGame(idRoom: string, idUser: string): void {
    delete this.storageWS[idRoom][idUser];
  }

  sendAllSockets(action: EACTION_WEBSOCKET, payload?: {}): void {
    this.headWS.forEach((roomWS) =>
      roomWS.send(JSON.stringify({ action, payload })),
    );
  }

  addWebSocket(webSocket: myWebSocket): void {
    this.headWS.push(webSocket);
  }

  deleteWebSocket(webSocket: myWebSocket): void {
    const index = this.headWS.indexOf(webSocket);
    index > -1 ? this.headWS.splice(index, 1) : '';
  }

  deleteRoom(idRoom: string): void {
    delete this.storageWS[idRoom];
  }
}

export const storage_WS = new StorageWS();
