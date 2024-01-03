import { Injectable } from '@nestjs/common';
import { RoomGame } from 'src/game/room/room';
import { RoomI, infoRoom, rooms } from 'src/types';
import { v4 as uuidv4 } from 'uuid'
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

    async controlRoom({ action, idUser, idRoom, colorPlayer }: ControlRoomPayload, client: myWebSocket): Promise<void> {
        switch (action) {
            case "join":
                this.rooms[idRoom].addPlayer(idUser, colorPlayer);
                storage_WS.addWebSocketGame(idRoom, idUser, client);
                break;
            case "leave":
                storage_WS.leavePlayerGame(idRoom, idUser);
                break;
            default:
                break;
        }
        await this.sendRooms();
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

    createRoom(createRoomDto: CreateRoomDto): string {
        const idRoom = uuidv4();
        this.rooms[idRoom] = new RoomGame(createRoomDto, idRoom, this.userService);
        return idRoom;
    }

    getRoom(idRoom: string): RoomI | undefined {
        const room = this.rooms[idRoom];
        return room ? room : undefined;
    }

    disconnectPlayer(idRoom: string, idUser: string): void {
        const room = this.rooms[idRoom];
        if (room && idUser) {
            const timer = setTimeout(() => {
                room.disconnectPlayer(idUser);
                this.sendRooms();
                this.playersOffline = this.playersOffline.filter((player) => player && player.idUser !== idUser);
            }, TIME_DISCONNECT);
            storage_players.getPlayer(idRoom, idUser).online = false;
            this.playersOffline.push({ idRoom, idUser, timer })
        };
    }

    reconnectPlayerId(idUser: string): string {
        const player = this.playersOffline.filter((player) => (player && player.idUser === idUser))[0];
        return player ? player.idRoom : '';
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

    // private filterStartRoom(): string[] {
    //     const r = Object.keys(this.rooms).filter((key) =>
    //         !this.rooms[key].stateRoom
    //     );
    //     return r;
    // }

}
