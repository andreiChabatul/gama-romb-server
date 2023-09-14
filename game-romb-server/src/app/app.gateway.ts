import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import WebSocket from "ws";
import { Server } from 'socket.io';
import { GameCreateDto } from 'src/game/dto/game.create.dto';
import { BuyCompanyPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, PayloadJoinGame, Rooms, payloadSocket } from 'src/types';
import { Room } from 'src/game/room';
import { v4 as uuidv4 } from 'uuid'

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
        const diceRoll = payloadSocket.payload as DiceRollGamePayload;
        rooms[diceRoll.idRoom].playerMove(diceRoll.idUser, diceRoll.value, diceRoll.isDouble);
        break;

      case EACTION_WEBSOCKET.BUY_COMPANY:
        const buyPayload = payloadSocket.payload as BuyCompanyPayload;
        rooms[buyPayload.idRoom].playerBuyCompany(buyPayload.idUser, buyPayload.indexCompany);
        break;

      case EACTION_WEBSOCKET.CANCEL_BUY:
        const canselBuyPayload = payloadSocket.payload as BuyCompanyPayload;
        rooms[canselBuyPayload.idRoom].playerCancelBuyCompany(canselBuyPayload.indexCompany);
        break;

      case EACTION_WEBSOCKET.AUCTION_STEP:
        const AuctionStepPayload = payloadSocket.payload as BuyCompanyPayload;
        rooms[AuctionStepPayload.idRoom].playerMakeBidAuction(AuctionStepPayload.idUser, AuctionStepPayload.indexCompany);
        break;

      case EACTION_WEBSOCKET.AUCTION_END:
        const AuctionEndPayload = payloadSocket.payload as BuyCompanyPayload;
        rooms[AuctionEndPayload.idRoom].companyAuctionEnd(AuctionEndPayload.indexCompany);
        break;

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
