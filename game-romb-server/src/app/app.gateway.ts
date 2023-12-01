import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import WebSocket from "ws";
import { RoomsControllerI } from 'src/types';
import { RoomsController } from 'src/game/room/rooms.controller';
import { Server } from 'http';
import { EACTION_WEBSOCKET, payloadSocket } from 'src/types/websocket';

@WebSocketGateway(3100, {
  cors: {
    origin: '*',
  }
})

export class AppGateway {
  @WebSocketServer()
  server: Server;
  roomsController: RoomsControllerI

  constructor() {
    this.roomsController = new RoomsController();
  }

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: payloadSocket): void {
    this.roomsController.processing(client, payload);
  }

  handleDisconnect(client: WebSocket) {
    this.roomsController.disconnected(client);
    // console.log(`Disconnected: ${client}`);
    //Выполняем действия
  }

  handleConnection(client: WebSocket) {
    this.roomsController.addSocket(client);
  }

}
