import { Injectable } from '@nestjs/common';
import { RoomGame } from 'src/game/room/room';
import { RoomI, infoRoom, rooms } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import { ControlRoomPayload, EACTION_WEBSOCKET, myWebSocket } from 'src/types/websocket';
import { UserService } from 'src/user/user.service';
import { storage_WS } from 'src/game/socketStorage';
import { CreateRoomDto } from './dto/create.room.dto';
import { playersOffline } from 'src/types/socketStorage';
import { TIME_DISCONNECT } from 'src/const';
import { WebSocket } from "ws";
import { storage_players } from 'src/game/playerStorage';

@Injectable()
export class RoomsService {

    constructor(private userService: UserService) { }

    private rooms: rooms = {};
    private playersOffline: playersOffline[] = [];

    controlRoom({ action, idUser, idRoom, colorPlayer }: ControlRoomPayload, client: myWebSocket): void {
        switch (action) {
            case "join":
                this.checkActiveRoom(idUser);
                this.rooms[idRoom].addPlayer(idUser, colorPlayer);
                storage_WS.addWebSocketGame(idRoom, idUser, client);
                this.sendRooms();
                break;
            case "leave":
                this.deletePlayer(idRoom, idUser, true);
                break;
            default:
                break;
        }
    }

    async sendRooms(): Promise<void> {
        const payload = await this.getAllRooms();
        storage_WS.sendAllSockets(EACTION_WEBSOCKET.CONTROL_ROOM, payload);
    }

    async getAllRooms(): Promise<infoRoom[]> {
        this.filterEmptyRoom();
        return await Promise.all(Object.keys(this.rooms).map((key) =>
            this.rooms[key].returnInfoRoom()
        ));
    }

    async filterRoom(query: string): Promise<infoRoom[]> {
        const rooms = await this.getAllRooms();
        return rooms.filter((room) => room.roomName.toLowerCase().includes(query.toLowerCase()));
    }

    createRoom(createRoomDto: CreateRoomDto): string {
        const idRoom = uuidv4();
        this.rooms[idRoom] = new RoomGame(createRoomDto, idRoom, this.userService);
        return idRoom;
    }

    getRoom(idRoom: string): RoomI | undefined {
        return this.rooms[idRoom];
    }

    disconnectPlayer(idRoom: string, idUser: string): void {
        const room = this.rooms[idRoom];
        if (room && idUser) {
            if (room.stateRoom) {
                const timer = setTimeout(() => {
                    room.leavePlayerGame(idUser);
                    this.playersOffline = this.playersOffline.filter((player) => player && player.idUser !== idUser);
                }, TIME_DISCONNECT);
                storage_players.getPlayer(idRoom, idUser).online = false;
                this.playersOffline.push({ idRoom, idUser, timer });
            } else {
                this.deletePlayer(idRoom, idUser, true);
            };
        }
    }

    async reconnectPlayerId(idUser: string): Promise<infoRoom | undefined> {
        const player = this.playersOffline.filter((player) => (player && player.idUser === idUser))[0];
        return player ? this.rooms[player.idRoom].returnInfoRoom() : undefined;
    }

    reconnectPlayer(idRoom: string, idUser: string, client: WebSocket): void {
        this.playersOffline = this.playersOffline.map((playersOffline) => {
            if (playersOffline.idUser && playersOffline.idUser === idUser) {
                clearTimeout(playersOffline.timer);
                return;
            } else {
                return playersOffline;
            }
        });
        storage_WS.addWebSocketGame(idRoom, idUser, client);
        this.rooms[idRoom].reconnectPlayer(idUser);
    }

    private filterEmptyRoom(): void {
        Object.keys(this.rooms).map((key) =>
            storage_players.getPlayersRoom(key).length ? '' : delete this.rooms[key]);
    }

    private deletePlayer(idRoom: string, idUser: string, isSend: Boolean): void {
        storage_players.deletePlayer(idRoom, idUser);
        isSend ? this.sendRooms() : '';
    }

    private checkActiveRoom(idUser: string): void {
        const activeRoomId = storage_players.searchActiveRoom(idUser);
        if (activeRoomId) {
            this.deletePlayer(activeRoomId, idUser, false);
        };
    }

}
