import { Player } from "src/types";
import { users } from "src/users/users.service";
import { CIRCLE_REWARD, MAX_INDEX_CELL_BOARD } from "./defaultBoard/defaultBoard";
import { Chat } from "./chat.room";

export class PlayerDefault implements PlayerDefault {

    private id: string;
    private name: string;
    private image: string;
    private total: number;
    private capital: number;
    private cellPosition: number;
    private isTurn: boolean;
    private numberPlayer: number;
    private chat: Chat;

    constructor(id: string, numberPlayer: number, chat: Chat) {
        const playerNew = users.find(user => user.userId === id);
        this.id = id;
        this.name = playerNew.nickname;
        this.image = 'temp';
        this.total = 1000;
        this.capital = 0;
        this.cellPosition = 0;
        this.isTurn = false;
        this.numberPlayer = numberPlayer;
        this.chat = chat;
    }

    turnPlayer(): void {
        this.isTurn = true;
    }

    setPosition(value: number) {
        this.chat.addMessage(`${this.name} rolled ${value}`);
        this.cellPosition = this.positionCellCalc(value);
    }

    returnNumberPlayer(): number {
        return this.numberPlayer;
    }

    getCellPosition(): number {
        return this.cellPosition;
    }


    getTotalPlayer(): number {
        return this.total;
    }

    getNamePlayer(): string {
        return this.name;
    }

    setTotalPlayer(value: number): void {
        this.total = value;
    }


    returnPlayer(): Player {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            total: this.total,
            capital: this.capital,
            cellPosition: this.cellPosition,
            isTurn: this.isTurn,
            numberPlayer: this.numberPlayer,
        };
    }


    private positionCellCalc(value: number): number {
        let resultPosition = this.cellPosition + value;
        if (resultPosition >= 38) {
            this.total += CIRCLE_REWARD;
            this.chat.addMessage(`${this.name} receives ${CIRCLE_REWARD} for completing a circle`);
            resultPosition = resultPosition - MAX_INDEX_CELL_BOARD;
        }
        return resultPosition;
    }

}