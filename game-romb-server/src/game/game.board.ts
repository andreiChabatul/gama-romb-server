import { PlayersGame, cells, gameCell } from "src/types";
import { defaultBoard } from "./defaultBoard/defaultBoard";
import { CellCompany } from "./cells/cell.company";
import { PlayerDefault } from "./player";

export class Game {

    private _board: gameCell[];

    constructor(
        private players: PlayersGame,
        private cellsGame: cells[]) {
        this._board = defaultBoard;
    }

    startGame() {
        this.updatePositionPlayers();
        this.updateCompanyInfoBoard();
    }

    get board(): gameCell[] {
        this.updatePositionPlayers();
        this.updateCompanyInfoBoard();
        return this._board;
    }

    private updatePositionPlayers(): void {
        this._board.map((cell) => cell.players = []);
        Object.keys(this.players).map((key) => {
            const player = this.players[key] as PlayerDefault;
            this._board[player.position].players.push(player.playerNumber)
        }
        );
    }

    private updateCompanyInfoBoard() {
        this.cellsGame.map((cell, index) => {
            if (cell instanceof CellCompany) {
                this._board[index].cellCompany = cell.getInfoCellCompany();
            }
        })
    }

}