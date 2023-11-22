import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import WebSocket from "ws";
import { Server } from 'socket.io';
import { GameCreateDto } from 'src/game/dto/game.create.dto';
import { rooms } from 'src/types';
import { v4 as uuidv4 } from 'uuid'
import { ContorolCompanyPayload, ControlAuctionPayload, DefaultPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, PayloadJoinGame, payloadSocket } from 'src/types/websocket';
import { RoomGame } from 'src/game/room';

const sockets: WebSocket[] = [];

@WebSocketGateway(3100, {
  cors: {
    origin: '*',
  }
})

export class AppGateway {
  @WebSocketServer()
  server: Server;
  rooms: rooms = {};

  @SubscribeMessage('message')
  handleMessage(client: WebSocket, payload: string): void {
    sockets.push(client);
    const payloadSocket: payloadSocket = JSON.parse(payload);
    // console.log(payloadSocket, 'payload')
    switch (payloadSocket.action) {

      case EACTION_WEBSOCKET.CREATE_GAME:
        const payloadGame = payloadSocket.payload as GameCreateDto;
        const idRoom = uuidv4();
        const room = new RoomGame(payloadGame, idRoom);
        room.addPlayer(payloadGame.idUser, client);
        this.rooms[idRoom] = room;
        this.sendRooms();
        break;

      case EACTION_WEBSOCKET.LIST_ROOM:
        this.sendRooms();
        break;

      case EACTION_WEBSOCKET.JOIN_GAME:
        const joinGame = payloadSocket.payload as PayloadJoinGame;
        this.rooms[joinGame.idRoomJoin].addPlayer(joinGame.idUser, client);
        break;

      case EACTION_WEBSOCKET.MESSAGE_CHAT:
        const messageChat = payloadSocket.payload as MessageChatGamePayload;
        this.rooms[messageChat.idRoom].addChatMessage(messageChat.message, messageChat.idUser);
        break;

      case EACTION_WEBSOCKET.DICE_ROLL:
        const diceRollPayload = payloadSocket.payload as DiceRollGamePayload;
        this.rooms[diceRollPayload.idRoom].playerMove(diceRollPayload);
        break;

      case EACTION_WEBSOCKET.ACTIVE_CELL:
        const activeCellPayload = payloadSocket.payload as DefaultPayload;
        this.rooms[activeCellPayload.idRoom].activeCell(activeCellPayload.idUser);
        break;

      case EACTION_WEBSOCKET.CONTROL_COMPANY:
        const controlCompanyPayload = payloadSocket.payload as ContorolCompanyPayload;
        this.rooms[controlCompanyPayload.idRoom].controlCompany(controlCompanyPayload);
        break;

      case EACTION_WEBSOCKET.CONTROL_DEAL: {
        const offerDealPayload = payloadSocket.payload as OfferDealPayload;
        this.rooms[offerDealPayload.idRoom].offerDealControl(offerDealPayload);
        break;
      }

      case EACTION_WEBSOCKET.AUCTION: {
        const controlAuctionPayload = payloadSocket.payload as ControlAuctionPayload;
        this.rooms[controlAuctionPayload.idRoom].controlAuction(controlAuctionPayload.idUser, controlAuctionPayload.action)
        break;
      }

      // case EACTION_WEBSOCKET.BANKRUPT: {
      //   const bankruptlPayload = payloadSocket.payload as DefaultPayload;
      //   this.rooms[bankruptlPayload.idRoom].playerBankrupt(bankruptlPayload.idUser);
      //   break;
      // }

      default:
        break;
    }
  }

  sendRooms(): void {
    const payload = [];
    Object.keys(this.rooms).map((key) => payload.push(this.rooms[key].returnInfoRoom()))
    sockets.map((client) =>
      client.send(JSON.stringify({ action: EACTION_WEBSOCKET.LIST_ROOM, payload }))
    );
  }
}


