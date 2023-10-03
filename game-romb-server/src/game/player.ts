import { Player, PlayerDefaultI } from "src/types";
import { users } from "src/users/users.service";
import { Chat } from "./chatGame/chat.room";
import { CIRCLE_REWARD, INIT_TOTAL, MAX_INDEX_CELL_BOARD } from "src/app/const";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";


export class PlayerDefault implements PlayerDefaultI {

    private _name: string;
    private image: string;
    private _total: number;
    private capital: number;
    private cellPosition: number;

    constructor(
        private roomWS: Room_WS,
        private id: string,
        private _color: string,
        private chat: Chat) {
        const playerNew = users.find(user => user.userId === id);
        this._name = playerNew.nickname;
        this.image = 'temp';
        this._total = INIT_TOTAL;
        this.capital = 0;
        this.cellPosition = 0;
    }

    set position(value: number) {
        this.cellPosition = this.positionCellCalc(value);
        this.updatePlayer();
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

    get userId(): string {
        return this.id;
    }

    setTotalPlayer(value: number): void {
        this._total = value;
    }

    buyCompany(price: number): void {
        this._total -= price;
        this.updatePlayer();
    }

    payRentCompany(rent: number, player: PlayerDefault): void {
        this.chat.addMessage(`${this._name} pays rent in the amount ${rent}`);
        this._total -= rent;
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

    private positionCellCalc(value: number): number {
        let resultPosition = this.cellPosition + value;
        if (resultPosition >= 38) {
            this._total += CIRCLE_REWARD;
            this.chat.addMessage(`${this._name} receives ${CIRCLE_REWARD} for completing a circle`);
            resultPosition = resultPosition - MAX_INDEX_CELL_BOARD;
        }
        return resultPosition;
    }

    get player(): Player {
        return {
            id: this.id,
            color: this._color,
            name: this._name,
            image: this.image,
            total: this._total,
            capital: this.capital,
            cellPosition: this.cellPosition,
        };
    }
    
    get color(): string {
        return this._color;
    }

    updatePlayer(): void {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_PLAYER, {
            id: this.id,
            total: this._total,
            capital: this.capital,
            cellPosition: this.cellPosition,
        })
    }
}