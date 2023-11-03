import { Player, PlayerDefaultI } from "src/types";
import { users } from "src/users/users.service";
import { Chat } from "./chatGame";
import { CIRCLE_REWARD, INIT_TOTAL, MAX_INDEX_CELL_BOARD } from "src/app/const";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { EMESSAGE_CLIENT } from "src/app/const/enum";


export class PlayerDefault implements PlayerDefaultI {

    private _name: string;
    private image: string;
    private _total: number;
    private _prison: boolean;
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
        this._prison
            ? this.cellPosition = value
            : this.cellPosition = this.positionCellCalc(value);
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

    private positionCellCalc(value: number): number {
        let resultPosition = this.cellPosition + value;
        if (resultPosition >= 38) {
            this._total += CIRCLE_REWARD;
            // this.chat.addMessage(`${this._name} receives ${CIRCLE_REWARD} for completing a circle`);
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
            prison: this._prison
        })
    }

    set addTotal(value: number) {
        this._total += value;
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.ADD_TOTAL, playerId: this.id, valueroll: value });
        this.updatePlayer();
    }

    minusTotal(valueroll: number, action: EMESSAGE_CLIENT = EMESSAGE_CLIENT.MINUS_TOTAL, cellId?: number) {
        this._total -= valueroll;
        this.chat.addSystemMessage({ action, playerId: this.id, valueroll, cellId });
        this.updatePlayer();
    }

    get prison(): boolean {
        return this._prison;
    }

    set prison(value: boolean) {
        this._prison = value;
        this.updatePlayer();
    }
}