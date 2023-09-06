import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chat.room";
import { EACTION_WEBSOCKET, Player, PlayersGame, RoomClass } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";

export class Room implements RoomClass {

    numberPLayer = 0;
    maxPlayers: number;
    isVisiblity: boolean;
    roomName: string;
    players: PlayersGame = {} as PlayersGame;
    webSocketRoom: WebSocket[] = [];
    game: Game;
    chat: Chat;
    idRoom: string;

    constructor(gameCreateDto: GameCreateDto, idRoom: string) {
        this.idRoom = idRoom;
        this.roomName = gameCreateDto.roomName;
        this.maxPlayers = gameCreateDto.players;
        this.chat = new Chat();
        this.game = new Game(gameCreateDto, this.players);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
    }

    addPlayer(id: string, client: WebSocket) {
        this.webSocketRoom.push(client);
        const player = new PlayerDefault(id, this.numberPLayer);
        this.numberPLayer += 1;
        this.players[id] = player;
        this.game.startGame();
        this.checkStartGame();

    }

    private checkStartGame() {
        this.updateRoom();
    }


    playerMove(idUser: string, value: number) {
        this.game.playerMove(idUser, value);
        this.updateRoom();
    }


    addChatMessage(message: string, idUser: string) {
        const playerChat = this.returnInfoPlayers().find(player => player.id === idUser);
        this.chat.addMessage(message, playerChat);
        this.updateRoom();
    }

    updateRoom() {
        this.returnInfoPlayers();
        const payload = {
            idRoom: this.idRoom,
            players: this.returnInfoPlayers(),
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
            players: this.returnInfoPlayers(),
            idRoom: this.idRoom,
            isVisiblity: this.isVisiblity,
            roomName: this.roomName
        }
    }

    private returnInfoPlayers(): Player[] {
        return Object.keys(this.players).map((key) => this.players[key].returnPlayer(), []);
    }



}
