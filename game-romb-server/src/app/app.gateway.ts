import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import WebSocket from "ws";
import { Server } from 'socket.io';
import { GameCreateDto } from 'src/game/dto/game.create.dto';
import { Rooms } from 'src/game/room';
import { EACTION_WEBSOCKET, MessageChatGamePayload, payloadSocket } from 'src/types';

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
    const payloadSocket: payloadSocket = JSON.parse(payload);
    console.log(payloadSocket)
    switch (payloadSocket.action) {
      case EACTION_WEBSOCKET.CREATE_GAME:
        const payloadGame = payloadSocket.payload as GameCreateDto;
        rooms.addRoom(payloadGame);
        sendRooms();
        break;
      case EACTION_WEBSOCKET.LIST_ROOM:
        sendRooms();
        break;
      case EACTION_WEBSOCKET.JOIN_GAME:
        console.log(1)
        break;
        case EACTION_WEBSOCKET.MESSAGE_CHAT:
          const messageChat = payloadSocket.payload as MessageChatGamePayload;
          console.log(messageChat)
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
