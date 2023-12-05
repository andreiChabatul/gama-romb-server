import { RoomsControllerI, rooms } from "src/types";
import { ContorolCompanyPayload, ControlAuctionPayload, ControlRoomPayload, DefaultPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, EndGamePayload, payloadSocket, myWebSocket } from "src/types/websocket";
import { WebSocket } from "ws";
import { RoomGame } from "./room";
import { v4 as uuidv4 } from 'uuid'

export class RoomsController implements RoomsControllerI {

    rooms: rooms = {};
    sockets: WebSocket[] = [];

    processing(client: WebSocket, [action, data]: payloadSocket): void {
        switch (action) {

            case EACTION_WEBSOCKET.CONTROL_ROOM:
                const controlRoomPayload = data as ControlRoomPayload;
                this.controlRoom(controlRoomPayload, client);
                break;

            case EACTION_WEBSOCKET.UPDATE_CHAT:
                const messageChatGamePayload = data as MessageChatGamePayload;
                this.rooms[messageChatGamePayload.idRoom].addChatMessage(messageChatGamePayload);
                break;

            case EACTION_WEBSOCKET.DICE_ROLL:
                const diceRollPayload = data as DiceRollGamePayload;
                this.rooms[diceRollPayload.idRoom].playerMove(data as DiceRollGamePayload);
                break;

            case EACTION_WEBSOCKET.ACTIVE_CELL:
                const activeCellPayload = data as DefaultPayload;
                this.rooms[activeCellPayload.idRoom].activeCell(activeCellPayload.idUser);
                break;

            case EACTION_WEBSOCKET.CONTROL_COMPANY:
                const controlCompanyPayload = data as ContorolCompanyPayload;
                this.rooms[controlCompanyPayload.idRoom].controlCompany(controlCompanyPayload);
                break;

            case EACTION_WEBSOCKET.CONTROL_DEAL: {
                const offerDealPayload = data as OfferDealPayload;
                this.rooms[offerDealPayload.idRoom].controlDeal(offerDealPayload);
                break;
            }

            case EACTION_WEBSOCKET.AUCTION: {
                const controlAuctionPayload = data as ControlAuctionPayload;
                this.rooms[controlAuctionPayload.idRoom].controlAuction(controlAuctionPayload);
                break;
            }

            case EACTION_WEBSOCKET.END_GAME: {
                const endGamePayload = data as EndGamePayload;
                this.rooms[endGamePayload.idRoom]
                    ? this.rooms[endGamePayload.idRoom].endGame(endGamePayload)
                    : '';
                break;
            }

            default:
                break;
        }

    }

    controlRoom({ action, gameCreate, idUser, idRoomJoin, colorPlayer }: ControlRoomPayload, client: WebSocket): void {
        switch (action) {
            case 'create':
                const idRoom = uuidv4();
                const room = new RoomGame(gameCreate, idRoom);
                this.rooms[idRoom] = room;
                room.addPlayer(idUser, gameCreate.colorPlayer, client);
                break;
            case "list":
                break;
            case "join":
                this.rooms[idRoomJoin].addPlayer(idUser, colorPlayer, client);
                break;
            case "leave":
                this.rooms[idRoomJoin].deletePlayer(idUser);
                break;
            default:
                break;
        }
        this.sendRooms();
    }

    sendRooms(): void {
        const payload = [];
        Object.keys(this.rooms).map((key) =>
            this.rooms[key].amountPlayers
                ? payload.push(this.rooms[key].returnInfoRoom())
                : delete this.rooms[key]);
        this.sockets.map((client) =>
            client.send(JSON.stringify({ action: EACTION_WEBSOCKET.LIST_ROOM, payload }))
        );
    }

    disconnected(client: myWebSocket): void {
        const index: number = this.sockets.indexOf(client);
        index > -1 ? this.sockets.splice(index, 1) : '';
        Object.values(this.rooms).forEach((room) => room.disconnectPlayer(client.idPlayer));
    }

    addSocket(client: WebSocket): void {
        this.sockets.push(client);
    }

}
