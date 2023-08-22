import { Room } from "src/types";
import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";

export class Rooms {
    rooms: Room[] = [];
    idRooms = 0;

    addRoom(gameCreateDto: GameCreateDto) {
        this.idRooms += 1;
        const newGame = new Game(gameCreateDto);
        this.rooms.push({ id: this.idRooms, room: newGame, players: 1 })
    }

    getAllRoom (){
        return this.rooms;
    }

    getAllRooms() {
        return this.rooms;
    }

    getAllRooms() {
        return this.rooms;
    }

}

export const rooms = new Rooms()
