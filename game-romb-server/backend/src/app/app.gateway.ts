import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { RoomsService } from 'src/rooms/rooms.services';
import { payloadSocket, myWebSocket } from 'src/types/websocket';
import { AppGateWayController } from './app.gateway.controller';
import { storage_WS } from 'src/game/socketStorage';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private appGateWayController: AppGateWayController,
    private roomsService: RoomsService,
  ) {}

  @SubscribeMessage('message')
  handleMessage(client: myWebSocket, payload: payloadSocket): void {
    const { idRoom, idUser } = payload[1];
    client.idUser = idUser;
    client.idRoom = idRoom;
    this.appGateWayController.handleMessage(client, payload);
  }

  handleDisconnect(client: myWebSocket): void {
    storage_WS.deleteWebSocket(client);
    if ((client.idUser, client.idRoom)) {
      this.roomsService.disconnectPlayer(client.idRoom, client.idUser);
    }
  }

  handleConnection(client: myWebSocket) {
    storage_WS.addWebSocket(client);
  }
}
