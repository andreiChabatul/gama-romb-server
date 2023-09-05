import { GameBoard, gameCell } from "src/types";
import { GameCreateDto } from "./dto/game.create.dto";
import { defaultBoard } from "./defaultBoard/defaultBoard";
import { PlayerDefault } from "./player";

export class Game implements GameBoard {

    board: gameCell[];
    players: PlayerDefault[];
    activePlayer: number;
    gameSetting: GameCreateDto;
    numberPLayer = 1;

    constructor(gameSetting: GameCreateDto) {
        this.gameSetting = gameSetting;
        this.activePlayer = 0;
        this.board = defaultBoard;
        this.players = [];
    }



    getBoard() {
        return this.board;
    }

  
    addPlayerGame(id: string) {
        this.players.push(new PlayerDefault(id, this.numberPLayer));
        this.numberPLayer += 1;
    }

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





}