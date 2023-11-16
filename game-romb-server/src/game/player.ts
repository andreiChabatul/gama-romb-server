import { Player, PlayerDefaultI, cells, prisonPlayer } from "src/types";
import { users } from "src/users/users.service";
import { Chat } from "./chatGame";
import { CIRCLE_REWARD, INIT_TOTAL, MAX_INDEX_CELL_BOARD } from "src/app/const";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { EMESSAGE_CLIENT } from "src/app/const/enum";


export class PlayerDefault implements PlayerDefaultI {

    private _name: string;
    private image: string;
    private _total: number;
    private _prison: prisonPlayer;
    private cellPosition: number;

    constructor(
        private roomWS: Room_WS,
        private id: string,
        private _color: string,
        private chat: Chat,
        private cells: cells[]) {
        const playerNew = users.find(user => user.userId === id);
        this._name = playerNew.nickname;
        this.image = 'temp';
        this._total = INIT_TOTAL;
        this.cellPosition = 0;
        this._prison = { state: false, attempt: 0 };
    }

    set position(value: number) {
        this._prison.state
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
        if (resultPosition >= MAX_INDEX_CELL_BOARD) {
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
            prison: this._prison
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
        return this._prison.state;
    }

    set prison(value: boolean) {
        value
            ? this._prison = { state: true, attempt: 3 }
            : this._prison = { state: false, attempt: 0 }
        this.updatePlayer();
    }

    set attemptPrison(value: boolean) {
        value ? this._prison.attempt-- : '';
        this.updatePlayer();
    }

    get capital(): number {
        return this.cells.reduce((capital, cell) =>
            ('controlCompany' in cell && cell.owned === this.userId && !cell.pledge)
                ? capital + cell.info.collateralCompany + (cell.quantityStock * cell.infoCompany.priceStock)
                : capital
            , this.total);
    }
}