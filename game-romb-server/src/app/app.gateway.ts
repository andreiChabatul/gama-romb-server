import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import WebSocket from "ws";
import { Socket, Server } from 'socket.io';
import { GameCreateDto } from 'src/game/dto/game.create.dto';
import { Rooms } from 'src/game/room';
import { rooms } from 'src/game/room';
import { EACTION_WEBSOCKET, payloadSocket } from 'src/types';
import WebSocket from "ws";

const sockets: WebSocket[] = [];
const rooms = new Rooms();

@WebSocketGateway(3100, {
  cors: {
    origin: '*',
  }
})
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string): void {
    sockets.push(client);
    const payloadSocket: payloadSocket = JSON.parse(payload)
    switch (payloadSocket.action) {
      case EACTION_WEBSOCKET.CREATE_GAME:
        const payloadGame = payloadSocket.payload as GameCreateDto;
        rooms.addRoom(payloadGame);
        sendRooms();
        break;

      case EACTION_WEBSOCKET.LIST_ROOM:
        sendRooms();
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
  }
}

const sendRooms = () => {
  const payload = rooms.getAllRooms();
  sockets.map((client) =>
    client.send(JSON.stringify({ action: EACTION_WEBSOCKET.LIST_ROOM, payload }))
  );
}
