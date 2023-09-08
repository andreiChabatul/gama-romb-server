import { GameBoard, PlayersGame, cells, gameCell } from "src/types";
import { GameCreateDto } from "./dto/game.create.dto";
import { defaultBoard } from "./defaultBoard/defaultBoard";
import { CellCompany } from "./cells/cell.company";

export class Game implements GameBoard {

    private board: gameCell[];
    private indexActive: number;
    gameSetting: GameCreateDto;
    players: PlayersGame;
    playersId: string[] = [];
    private cellsGame: cells[] = [];


    constructor(gameSetting: GameCreateDto, players: PlayersGame, cellsGame: cells[]) {
        this.gameSetting = gameSetting;
        this.indexActive = 0;
        this.board = defaultBoard;
        this.players = players;
        this.cellsGame = cellsGame;
    }

    startGame() {
        this.playersId = Object.keys(this.players).map((key) => this.players[key].returnPlayer().id);
        const activePlayer = this.players[this.playersId[this.indexActive]];
        activePlayer.turnPlayer();
        this.updatePositionPlayers();
        this.updateCompanyInfoBoard();
    }

    playerMove(idUser: string, value: number) {
        this.players[idUser].setPosition(value);

        if (this.cellsGame[this.players[idUser].getCellPosition()]) {
            this.cellsGame[this.players[idUser].getCellPosition()].cellProcessing(this.players[idUser])
        }
        
    }



    getBoard() {
        this.updatePositionPlayers();
        this.updateCompanyInfoBoard();
        return this.board;
    }


    private updatePositionPlayers(): void {
        this.board.map((cell) => cell.players = []);
        this.playersId.map((key) => {
            const player = this.players[key];
            this.board[player.getCellPosition()].players.push(player.returnNumberPlayer())
        }
        );
    }

    private updateCompanyInfoBoard() {
        this.cellsGame.map((cell, index) => {
            if (cell instanceof CellCompany){
                this.board[index].cellCompany = cell.getInfoCellCompany();
            }
        })
    }

}