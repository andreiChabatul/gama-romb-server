import { PlayerDefaultI, cells, prisonPlayer } from "src/types";
import { Chat } from "../chatGame";
import { CIRCLE_REWARD, INIT_TOTAL, MAX_INDEX_CELL_BOARD } from "src/const";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { EMESSAGE_CLIENT } from "src/const/enum";

export class PlayerDefault implements PlayerDefaultI {

    private _total: number;
    private _bankrupt: boolean;
    private _prison: prisonPlayer;
    private _isOnline: boolean;
    private cellPosition: number;

    constructor(
        private id: string,
        private _color: string,
        private roomWS: Room_WS,
        private chat: Chat,
        private cells: cells[]) {
        this._total = INIT_TOTAL;
        this.cellPosition = 0;
        this._prison = { state: false, attempt: 0 };
        this._isOnline = true;
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

    set bankrupt(value: boolean) {
        this._bankrupt = value;
        this.updatePlayer();
    }

    get bankrupt(): boolean {
        return this._bankrupt;
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

    get color(): string {
        return this._color;
    }

    updatePlayer(): void {
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.UPDATE_PLAYER, {
            id: this.id,
            total: this._total,
            capital: this.capital,
            cellPosition: this.cellPosition,
            prison: this._prison,
            bankrupt: this._bankrupt,
            online: this._isOnline
        })
    }

    set addTotal(value: number) {
        this._total += value;
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.ADD_TOTAL, idUser: this.id, valueroll: value });
        this.updatePlayer();
    }

    minusTotal(valueroll: number, action: EMESSAGE_CLIENT = EMESSAGE_CLIENT.MINUS_TOTAL, cellId?: number) {
        this._total -= valueroll;
        this.chat.addSystemMessage({ action, idUser: this.id, valueroll, cellId });
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

    set attemptPrison(value: number) {
        this._prison.attempt = value;
        this.updatePlayer();
    }

    set online(value: boolean) {
        this._isOnline = value;
        this.updatePlayer();
    }

    get attemptPrison(): number {
        return this._prison.attempt;
    }

    get capital(): number {
        return this.cells.reduce((capital, cell) =>
            ('controlCompany' in cell && cell.owned === this.userId && !cell.pledge)
                ? capital + cell.infoCompany.collateralCompany + (cell.quantityStock * cell.infoCompany.priceStock)
                : capital
            , this.total);
    }
}