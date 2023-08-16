import { Room } from "src/types";
import { Game } from "./gameBoard";

export class Rooms {
    rooms: Room[];
    idRooms = 0;

    addRoom() {
        this.idRooms += 1;
        const newGame = new Game(2);
        this.rooms.push({ id: this.idRooms, room: newGame })
    }


}