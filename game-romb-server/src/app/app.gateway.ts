import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import WebSocket from "ws";
import { RoomsControllerI } from 'src/types';
import { RoomsController } from 'src/game/room/rooms.controller';
import { Server } from 'http';
import { payloadSocket, myWebSocket } from 'src/types/websocket';

@WebSocketGateway(3100, {
  cors: {
    origin: '*',
  }
})

export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  roomsController: RoomsControllerI

  constructor() {
    this.roomsController = new RoomsController();
  }

  @SubscribeMessage('message')
  handleMessage(client: myWebSocket, payload: payloadSocket): void {
    client.idPlayer = payload[1].idUser;
    this.roomsController.processing(client, payload);
  }

  handleDisconnect(client: myWebSocket): void {
    this.roomsController.disconnected(client);
  }

  handleConnection(client: myWebSocket) {
    this.roomsController.addSocket(client);
  }

}
