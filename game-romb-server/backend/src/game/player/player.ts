import { CIRCLE_REWARD, INIT_TOTAL, MAX_INDEX_CELL_BOARD } from "src/const";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";
import { chatGame } from "../chatGame";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { PlayerDefaultI, updatePlayer } from "src/types/player";
import { CellsServiceI } from "src/types/cellsServices";

export class PlayerDefault implements PlayerDefaultI {

    _total: number;
    _turn: boolean;
    _bankrupt: boolean;
    _prison: number;
    _isOnline: boolean;
    cellPosition: number;

    constructor(
        private id: string,
        private idRoom: string,
        private _color: string,
        private cellsService: CellsServiceI) {
        this._total = INIT_TOTAL;
        this.cellPosition = 0;
        this._prison = 0;
        this._isOnline = true;
    }

    set position(value: number) {
        this._prison
            ? this.cellPosition = value
            : this.cellPosition = this.positionCellCalc(value);
        this.updatePlayer({ cellPosition: this.position });
    }

    get position(): number {
        return this.cellPosition;
    }

    get total(): number {
        return this._total;
    }

    set bankrupt(value: boolean) {
        if (value) {
            this._bankrupt = value;
            this.cellsService.playerBankrupt(this.id);
            this.updatePlayer({ bankrupt: this.bankrupt });
        };
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
            this.addTotal(CIRCLE_REWARD);
            // this.chat.addMessage(`${this._name} receives ${CIRCLE_REWARD} for completing a circle`);
            resultPosition = resultPosition - MAX_INDEX_CELL_BOARD;
        }
        return resultPosition;
    }

    updatePlayer(payload: {}): void {
        storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.UPDATE_PLAYER, { id: this.id, ...payload });
    }

    get playerInfo(): updatePlayer {
        return {
            id: this.id,
            color: this._color,
            total: this._total,
            capital: this.capital,
            cellPosition: this.cellPosition,
            prison: this.prison,
            bankrupt: this.bankrupt,
            online: this._isOnline
        };
    }

    addTotal(value: number) {
        this.total = value;
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.ADD_TOTAL, idUser: this.id, valueroll: value });
    }

    minusTotal(valueroll: number, action: EMESSAGE_CLIENT = EMESSAGE_CLIENT.MINUS_TOTAL, cellId?: number) {
        this.total = (-valueroll);
        chatGame.addChatMessage(this.idRoom, { action, idUser: this.id, valueroll, cellId });
    }

    set total(value) {
        this._total += value;
        this.updatePlayer({ total: this._total, capital: this.capital, });
    }

    get prison(): number {
        return this._prison;
    }

    set prison(value: number) {
        if (value) {
            this.cellPosition = 12;
        };
        this._prison = value;
        this.updatePlayer({ prison: this.prison, cellPosition: this.position });
    }

    set online(value: boolean) {
        this._isOnline = value;
        this.updatePlayer({ online: this._isOnline });
    }

    get capital(): number {
        return this.total + this.cellsService.calcCapitalCells(this.id);
    }

    get turn(): boolean {
        return this._turn;
    }

    set turn(value: boolean) {
        this._turn = value;
    }
}