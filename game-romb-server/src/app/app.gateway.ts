import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import WebSocket from "ws";
import { RoomsControllerI } from 'src/types';
import { RoomsController } from 'src/game/room/rooms.controller';
import { Server } from 'http';

@WebSocketGateway(3001, {
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
  handleMessage(client: WebSocket, payload: string): void {
    this.roomsController.processing(client, payload);
  }

  handleDisconnect(client: WebSocket) {
    this.roomsController.disconnected(client);
    // console.log(`Disconnected: ${client}`);
    //Выполняем действия
  }

  handleConnection(client: WebSocket) {
    console.log('conect')
    this.roomsController.addSocket(client);
  }

}
