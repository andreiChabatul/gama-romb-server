import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { rooms } from 'src/game/room';
import { EACTION_WEBSOCKET, PayloadCreateGame, payloadSocket } from 'src/types';
import WebSocket from "ws";


@WebSocketGateway(3100, {
  cors: {
    origin: '*',
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string): string {
    const payloadSocket: payloadSocket = JSON.parse(payload)
    switch (payloadSocket.action) {
      case EACTION_WEBSOCKET.CREATE_GAME:
        const payloadGame = payloadSocket.payload as PayloadCreateGame;
        console.log(payloadGame)
        break;
      case EACTION_WEBSOCKET.LIST_ROOM:
        const listRoom = rooms.getAllRoom();
        client.send(JSON.stringify({
          action: EACTION_WEBSOCKET.LIST_ROOM,
          payload: listRoom
        }))
      default:
        break;
    }

    return 'Hello world!';
  }

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    client.send('hello')
  }

}
