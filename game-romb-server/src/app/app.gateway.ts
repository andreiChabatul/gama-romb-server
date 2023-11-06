import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import WebSocket from "ws";
import { Server } from 'socket.io';
import { GameCreateDto } from 'src/game/dto/game.create.dto';
import { Rooms } from 'src/types';
import { Room } from 'src/game/room';
import { v4 as uuidv4 } from 'uuid'
import { ContorolCompanyPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, PayloadJoinGame, calcValuePayload, payloadSocket } from 'src/types/websocket';

const sockets: WebSocket[] = [];
const rooms: Rooms = {} as Rooms;

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
    // console.log(payloadSocket, 'payload')
    switch (payloadSocket.action) {

      case EACTION_WEBSOCKET.CREATE_GAME:
        const payloadGame = payloadSocket.payload as GameCreateDto;
        const idRoom = uuidv4();
        const room = new Room(payloadGame, idRoom);
        room.addPlayer(payloadGame.idUser, client);
        rooms[idRoom] = room;
        sendRooms();
        break;

      case EACTION_WEBSOCKET.LIST_ROOM:
        sendRooms();
        break;

      case EACTION_WEBSOCKET.JOIN_GAME:
        const joinGame = payloadSocket.payload as PayloadJoinGame;
        rooms[joinGame.idRoomJoin].addPlayer(joinGame.idUser, client);
        break;

      case EACTION_WEBSOCKET.MESSAGE_CHAT:
        const messageChat = payloadSocket.payload as MessageChatGamePayload;
        rooms[messageChat.idRoom].addChatMessage(messageChat.message, messageChat.idUser);
        break;

      case EACTION_WEBSOCKET.DICE_ROLL:
        const diceRollPayload = payloadSocket.payload as DiceRollGamePayload;
        rooms[diceRollPayload.idRoom].playerMove(diceRollPayload);
        break;

      case EACTION_WEBSOCKET.CALC_VALUE_LS:
        const payDebtPayload = payloadSocket.payload as calcValuePayload;
        rooms[payDebtPayload.idRoom].playerPay(payDebtPayload);
        break;

      case EACTION_WEBSOCKET.CONTROL_COMPANY:
        const controlCompanyPayload = payloadSocket.payload as ContorolCompanyPayload;
        rooms[controlCompanyPayload.idRoom].controlCompany(controlCompanyPayload);
        break;

      case EACTION_WEBSOCKET.CONTROL_DEAL: {
        const offerDealPayload = payloadSocket.payload as OfferDealPayload;
        rooms[offerDealPayload.idRoom].offerDealControl(offerDealPayload);
        break;
      }

      default:
        break;
    }
  }
}

const sendRooms = () => {
  const payload = [];
  Object.keys(rooms).map((key) => payload.push(rooms[key].returnInfoRoom()))
  sockets.map((client) =>
    client.send(JSON.stringify({ action: EACTION_WEBSOCKET.LIST_ROOM, payload }))
  );
}
