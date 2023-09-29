import { Player } from "src/types";
import { users } from "src/users/users.service";
import { MAX_INDEX_CELL_BOARD } from "./defaultBoard/defaultBoard";
import { Chat } from "./chatGame/chat.room";
import { WebSocket } from "ws";
import { CIRCLE_REWARD, INIT_TOTAL } from "src/app/const";
import { EACTION_WEBSOCKET } from "src/types/websocket";

export class PlayerDefault implements PlayerDefault {

    private _name: string;
    private image: string;
    private _total: number;
    private capital: number;
    private cellPosition: number;

    constructor(
        private id: string,
        private numberPlayer: number,
        private chat: Chat,
        private webSocket: WebSocket) {
        const playerNew = users.find(user => user.userId === id);
        this._name = playerNew.nickname;
        this.image = 'temp';
        this._total = INIT_TOTAL;
        this.capital = 0;
        this.cellPosition = 0;
    }

    set position(value: number) {
        this.chat.addMessage(`${this._name} rolled ${value}`);
        this.cellPosition = this.positionCellCalc(value);
    }

    get playerNumber(): number {
        return this.numberPlayer;
    }

    get position(): number {
        return this.cellPosition;
    }

    get total(): number {
        return this._total;
    }

    get name(): string {
        return this._name;
    }

    sendMessage(action: EACTION_WEBSOCKET, payload?: {}): void {
        this.webSocket.send(JSON.stringify(
            {
                action,
                payload
            }
        ))
    };

    setTotalPlayer(value: number): void {
        this._total = value;
    }

    buyCompany(price: number): void {
        this._total -= price;
    }

    payRentCompany(rent: number, player: PlayerDefault): void {
        this.chat.addMessage(`${this._name} pays rent in the amount ${rent}`);
        this._total -= rent;
        console.log('12')
    }

    payDebt(debt: number): void {
        this.chat.addMessage(`${this._name} выплачивает долг в размере: $${debt}`);
        this._total -= debt;
    }

    addTotal(value: number): void {
        this.chat.addMessage(`${this._name} получает: $${value}`);
        this._total += value;
    }

    buyStock(value: number, nameCompany: string): void {
        this.chat.addMessage(`${this._name} buys company shares ${nameCompany} for ${value}`);
        this._total -= value;
    }

    enrollRentCompany(rent: number): void {
        this._total += rent;
    }

    get player(): Player {
        return {
            id: this.id,
            name: this._name,
            image: this.image,
            total: this._total,
            capital: this.capital,
            cellPosition: this.cellPosition,
            numberPlayer: this.numberPlayer,
        };
    }

    private positionCellCalc(value: number): number {
        let resultPosition = this.cellPosition + value;
        if (resultPosition >= 38) {
            this._total += CIRCLE_REWARD;
            this.chat.addMessage(`${this._name} receives ${CIRCLE_REWARD} for completing a circle`);
            resultPosition = resultPosition - MAX_INDEX_CELL_BOARD;
        }
        return resultPosition;
    }

}