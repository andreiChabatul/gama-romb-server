import { prisonPlayer } from "src/types";
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
    _prison: prisonPlayer;
    _isOnline: boolean;
    cellPosition: number;

    constructor(
        private id: string,
        private idRoom: string,
        private _color: string,
        private cellsService: CellsServiceI) {
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
        this.cellsService.playerBankrupt(this.id);
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

    updatePlayer(idUser?: string): void {
        idUser
            ? storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.UPDATE_PLAYER, this.playerInfo)
            : storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.UPDATE_PLAYER, this.playerInfo);
    }

    get playerInfo(): updatePlayer {
        return {
            id: this.id,
            color: this._color,
            total: this._total,
            capital: this.capital,
            cellPosition: this.cellPosition,
            prison: this._prison,
            bankrupt: this._bankrupt,
            online: this._isOnline
        };
    }

    set addTotal(value: number) {
        this._total += value;
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.ADD_TOTAL, idUser: this.id, valueroll: value });
        this.updatePlayer();
    }

    minusTotal(valueroll: number, action: EMESSAGE_CLIENT = EMESSAGE_CLIENT.MINUS_TOTAL, cellId?: number) {
        this._total -= valueroll;
        chatGame.addChatMessage(this.idRoom, { action, idUser: this.id, valueroll, cellId });
        this.updatePlayer();
    }

    get prison(): boolean {
        return this._prison.state;
    }

    set prison(value: boolean) {
        if (value) {
            this.cellPosition = 12;
            this._prison = { state: true, attempt: 3 }
        } else {
            this._prison = { state: false, attempt: 0 }
        }
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
        return this.total + this.cellsService.calcCapitalCells(this.id);
    }

    get turn(): boolean {
        return this._turn;
    }

    set turn(value: boolean) {
        this._turn = value;
    }
}