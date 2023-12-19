import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { RoomsService } from 'src/rooms/rooms.services';
import { payloadSocket, myWebSocket } from 'src/types/websocket';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  }
})

export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private roomServices: RoomsService) { }

  @SubscribeMessage('message')
  handleMessage(client: myWebSocket, payload: payloadSocket): void {
    client.idPlayer = payload[1].idUser;
    this.roomServices.processing(client, payload);
  }

  handleDisconnect(client: myWebSocket): void {
    this.roomServices.disconnected(client);
  }

  handleConnection(client: myWebSocket) {
    this.roomServices.addSocket(client);
  }

}
