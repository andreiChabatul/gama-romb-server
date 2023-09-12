import { GameBoard, PlayersGame, cells, gameCell } from "src/types";
import { defaultBoard } from "./defaultBoard/defaultBoard";
import { CellCompany } from "./cells/cell.company";

export class Game implements GameBoard {

    readonly board: gameCell[];
    readonly players: PlayersGame;
    readonly cellsGame: cells[] = [];

    constructor(players: PlayersGame, cellsGame: cells[]) {
        this.board = defaultBoard;
        this.players = players;
        this.cellsGame = cellsGame;
    }

    startGame() {
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
        Object.keys(this.players).map((key) => {
            const player = this.players[key];
            this.board[player.getCellPosition()].players.push(player.getNumberPlayer())
        }
        );
    }

    private updateCompanyInfoBoard() {
        this.cellsGame.map((cell, index) => {
            if (cell instanceof CellCompany) {
                this.board[index].cellCompany = cell.getInfoCellCompany();
            }
        })
    }

}