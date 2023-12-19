import { Injectable } from '@nestjs/common';
import { RoomGame } from 'src/game/room/room';
import { playersOffline, rooms } from 'src/types';
import { v4 as uuidv4 } from 'uuid'
import { ContorolCompanyPayload, ControlAuctionPayload, ControlRoomPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, StateGamePayload, myWebSocket, payloadSocket } from 'src/types/websocket';
import { UserService } from 'src/user/user.service';
import { TIME_DISCONNECT } from 'src/const';
import { WebSocket } from "ws";

@Injectable()
export class RoomsService {

    constructor(private userService: UserService) { }

    private rooms: rooms = {};
    private sockets: myWebSocket[] = [];
    private playersOffline: playersOffline = {};

    processing(client: myWebSocket, [action, data]: payloadSocket): void {
        const { idRoom, idUser } = data;
        switch (action) {

            case EACTION_WEBSOCKET.CONNECT:
                this.connect(idUser, client);
                break;

            case EACTION_WEBSOCKET.CONTROL_ROOM:
                this.controlRoom(data as ControlRoomPayload, client);
                break;

            case EACTION_WEBSOCKET.UPDATE_CHAT:
                this.rooms[idRoom].addChatMessage(data as MessageChatGamePayload);
                break;

            case EACTION_WEBSOCKET.DICE_ROLL:
                this.rooms[idRoom].playerMove(data as DiceRollGamePayload);
                break;

            case EACTION_WEBSOCKET.ACTIVE_CELL:
                this.rooms[idRoom].activeCell(idUser);
                break;

            case EACTION_WEBSOCKET.CONTROL_COMPANY:
                this.rooms[idRoom].controlCompany(data as ContorolCompanyPayload);
                break;

            case EACTION_WEBSOCKET.CONTROL_DEAL:
                this.rooms[idRoom].controlDeal(data as OfferDealPayload);
                break;

            case EACTION_WEBSOCKET.AUCTION:
                this.rooms[idRoom].controlAuction(data as ControlAuctionPayload);
                break;

            case EACTION_WEBSOCKET.END_GAME:
                this.rooms[idRoom]
                    ? this.rooms[idRoom].stateGame(data as StateGamePayload)
                    : '';
                break;

            case EACTION_WEBSOCKET.RECONNECT_ACCESS:
                this.rooms[idRoom].reconnectPlayerAccess(idUser);
                break;

            default:
                break;
        }

    }

    controlRoom({ action, gameCreate, idUser, idRoomJoin, colorPlayer }: ControlRoomPayload, client: myWebSocket): void {
        switch (action) {
            case 'create':
                const idRoom = uuidv4();
                const room = new RoomGame(gameCreate, idRoom, this.userService);
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

    async sendRooms(): Promise<void> {
        this.filterEmptyRoom();
        const payload = await Promise.all(Object.keys(this.rooms).map((key) =>
            (this.rooms[key].returnInfoRoom())
        ));
        this.sockets.map((client) =>
            client.send(JSON.stringify({ action: EACTION_WEBSOCKET.LIST_ROOM, payload }))
        );
    }

    disconnected(client: myWebSocket): void {
        const index: number = this.sockets.indexOf(client);
        index > -1 ? this.sockets.splice(index, 1) : '';
        Object.values(this.rooms).forEach((room) => {
            const idUser = client.idPlayer;
            const player = room.getPlayer(idUser)
            if (idUser && player) {
                player.online = false;
                this.playersOffline[idUser] = setTimeout(() => {
                    room.disconnectPlayer(idUser);
                    this.sendRooms();
                }, TIME_DISCONNECT)
            }
        });
    }

    connect(idUser: string, client: WebSocket): void {
        clearTimeout(this.playersOffline[idUser]);
        Object.values(this.rooms).forEach((room) =>
            room.getPlayer(idUser) ? room.reconnectPlayer(idUser, client) : ''
        );
    }

    addSocket(client: myWebSocket): void {
        this.sockets.push(client);
    }

    filterEmptyRoom(): void {
        Object.keys(this.rooms).map((key) =>
            this.rooms[key].amountPlayers
                ? ''
                : delete this.rooms[key]);
    }

}
