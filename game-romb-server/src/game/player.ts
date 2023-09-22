import { Player } from "src/types";
import { users } from "src/users/users.service";
import { MAX_INDEX_CELL_BOARD } from "./defaultBoard/defaultBoard";
import { Chat } from "./chat.room";
import { WebSocket } from "ws";
import { CIRCLE_REWARD, INIT_TOTAL } from "src/app/const";

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
    private webSocket: WebSocket;

    constructor(id: string, numberPlayer: number, chat: Chat, webSocket: WebSocket) {
        const playerNew = users.find(user => user.userId === id);
        this.id = id;
        this.name = playerNew.nickname;
        this.image = 'temp';
        this.total = INIT_TOTAL;
        this.capital = 0;
        this.cellPosition = 0;
        this.isTurn = false;
        this.numberPlayer = numberPlayer;
        this.chat = chat;
        this.webSocket = webSocket;
    }

    setPosition(value: number) {
        this.chat.addMessage(`${this.name} rolled ${value}`);
        this.cellPosition = this.positionCellCalc(value);
    }

    getNumberPlayer(): number {
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

    getWebSocket(): WebSocket {
        return this.webSocket;
    }

    setTotalPlayer(value: number): void {
        this.total = value;
    }

    setTurnPlayer(value: boolean) {
        this.isTurn = value;
    }

    buyCompany(price: number): void {
        this.total -= price;
    }

    payRentCompany(rent: number): void {
        this.chat.addMessage(`${this.name} pays rent in the amount ${rent}`);
        this.total -= rent;
    }

    buyStock(value: number, nameCompany: string): void {
        this.chat.addMessage(`${this.name} buys company shares ${nameCompany} for ${value}`);
        this.total -= value;
    }

    enrollRentCompany(rent: number): void {
        this.total += rent;
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