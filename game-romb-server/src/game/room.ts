import { Game } from "./game.board";
import { GameCreateDto } from "./dto/game.create.dto";
import { Chat } from "./chat.room";
import { EACTION_WEBSOCKET, Player, PlayersGame, RoomClass, cells, createCell } from "src/types";
import { WebSocket } from "ws";
import { PlayerDefault } from "./player";
import { TAX_10, TAX_5 } from "./defaultBoard/defaultBoard";
import { CellTax } from "./cells/cell.tax";
import { CellCompany } from "./cells/cell.company";
import { defaultCell } from "./cells/defaultCell";


export class Room implements RoomClass {

    numberPLayer = 0;
    maxPlayers: number;
    isVisiblity: boolean;
    roomName: string;
    players: PlayersGame = {} as PlayersGame;
    webSocketRoom: WebSocket[] = [];
    private cellsGame: cells[] = [];
    private game: Game;
    private chat: Chat;
    idRoom: string;

    constructor(gameCreateDto: GameCreateDto, idRoom: string) {
        this.idRoom = idRoom;
        this.roomName = gameCreateDto.roomName;
        this.maxPlayers = gameCreateDto.players;
        this.chat = new Chat();
        this.game = new Game(gameCreateDto, this.players, this.cellsGame);
        gameCreateDto.visibility ? this.isVisiblity = true : this.isVisiblity = false;
        this.fillCellsGame();

    }

    addPlayer(id: string, client: WebSocket) {
        this.webSocketRoom.push(client);
        const player = new PlayerDefault(id, this.numberPLayer, this.chat);
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
            chat: this.chat.getAllMessage(),
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

    private fillCellsGame() {

        defaultCell.map((cell, index) => {
            if (cell.company) {
                this.cellsGame[index] = new CellCompany(cell.company, this.webSocketRoom, index)
            }
        })

        this.cellsGame[16] = new CellTax(TAX_5, this.chat);
        this.cellsGame[35] = new CellTax(TAX_10, this.chat);
    }





}
