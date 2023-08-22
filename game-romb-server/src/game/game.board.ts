import { Cell, GameBoard, side, stateCell } from "src/types";
import { GameCreateDto } from "./dto/game.create.dto";

export class Game implements GameBoard {
    size: number;
    board: Cell[];
    activePlayer: stateCell;
    gameSetting: GameCreateDto;

    constructor(gameSetting: GameCreateDto) {
        this.gameSetting = gameSetting;
        // this.createEmptyBoard();
        // this.tempBoardGame();
        this.activePlayer = 'playerTwo'
        this.size = 4
    }



    // getBoard() {
    //     return this.board;
    // }

    // clickLine(side: side, indexCell: number, state: stateCell) {
    //     this.board.map((item, index) => {
    //         if (index === indexCell) {
    //             item[side] = state;
    //             this.checkOccupiedCell(index, side);
    //             console.log(item)
    //         }
    //     })

    // }

    // private createEmptyBoard() {
    //     this.board = new Array(Math.pow(this.size, 2));
    //     for (let i = 0; i < this.board.length; i++) {
    //         this.board[i] = this.createEmptyCell(i);
    //     }
    // }

    // private createEmptyCell(indexCell: number): Cell {
    //     return {
    //         indexCell,
    //         left: 'none',
    //         top: 'none',
    //         occupied: 'none'
    //     }
    // };

    // private checkOccupiedCell(index: number, side: side) {
    //     if (side === 'left') {
    //         this.checkCell(index);
    //         this.checkCell(index - 1);
    //     } else {
    //         this.checkCell(index);
    //         this.checkCell(index - this.size);
    //     }
    // }

    // private checkCell(index: number): void {
    //     if (this.board[index].occupied === 'none') {
    //         const topCheck = this.board[index + this.size];
    //         const leftCheck = this.board[index + 1];
    //         if (leftCheck.left && topCheck.top) {
    //             const arr = [this.board[index].left, this.board[index].top, leftCheck.left, topCheck.top];
    //             if (!arr.includes('none')) {
    //                 this.board[index].occupied = this.activePlayer;
    //             }
    //         }
    //     }

    // }



    private tempBoardGame() {
        this.board[51].left = 'border';
        this.board[51].top = 'border';
        this.board[37].left = 'border';
        this.board[65].top = 'border';
        this.board[65].left = 'border';
        this.board[80].left = 'border';
        this.board[95].top = 'border';
        this.board[96].top = 'border';
        this.board[97].top = 'border';
        this.board[83].left = 'border';
        this.board[68].left = 'border';
        this.board[53].left = 'border';
        this.board[38].left = 'border';
        this.board[37].left = 'border';
        this.board[37].top = 'border';
    }

}