import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chat.room";
import { EACTION_WEBSOCKET, Player, RoomClass } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";

export class Room implements RoomClass {

    numberPLayer = 0;
    maxPlayers: number;
    isVisiblity: boolean;
    roomName: string;
    players: Player[] = [];
    webSocketRoom: WebSocket[] = [];
    game: Game;
    chat: Chat;
    idRoom: string;

    constructor(gameCreateDto: GameCreateDto, idRoom: string) {
        this.idRoom = idRoom;
        this.roomName = gameCreateDto.roomName;
        this.maxPlayers = gameCreateDto.players;
        this.chat = new Chat();
        this.game = new Game(gameCreateDto);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
    }

    addPlayer(id: string, client: WebSocket) {
        this.webSocketRoom.push(client);
        const player = new PlayerDefault(id, this.numberPLayer);
        this.numberPLayer += 1;
        this.players.push(player.returnPlayer());

        this.checkStartGame();
    }

    private checkStartGame() {
        this.updateRoom();
    }

    addChatMessage(message: string, idUser: string) {
        this.chat.addMessage(message);
        this.updateRoom();
    }

    updateRoom() {
        const payload = {
            idRoom: this.idRoom,
            players: this.players,
            chat: this.chat.returnAllMessage(),
            board: this.game.getBoard()
        }
        this.webSocketRoom.map(
            (client) => client.send(JSON.stringify({ action: EACTION_WEBSOCKET.UPDATE_ROOM, payload }))
        )
    }




    returnInfoRoom() {
        return {
            maxPLayers: this.maxPlayers,
            players: this.players,
            idRoom: this.idRoom,
            isVisiblity: this.isVisiblity,
            roomName: this.roomName
        }
    }

}
