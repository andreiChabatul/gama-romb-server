import { Room } from "src/types";
import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { v4 as uuidv4 } from 'uuid'
import { Chat } from "./chat.room";


export class Rooms {
    rooms: Room[] = [];

    addRoom(gameCreateDto: GameCreateDto) {
        const newGame = new Game(gameCreateDto);
        const newChat = new Chat();
        this.rooms.push(
            {
                id: uuidv4(),
                game: newGame,
                players: 1,
                chat: newChat,
            })
    }

 

    getAllRooms() {
        return this.rooms;
    }

}

export const rooms = new Rooms()

