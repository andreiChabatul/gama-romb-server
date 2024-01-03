import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { chatGame } from "../chatGame";
import { storage_players } from "../playerStorage";

export class TurnService {

    private indexActive: number;
    private isDouble: boolean;
    private doubleCounter: number = 0;
    private playersActive: string[];

    constructor(private idRoom: string) { }

    firstTurn(): void {
        this.playersActive = storage_players.getPlayersActive(this.idRoom);
        this.indexActive = Math.floor(Math.random() * storage_players.getPlayersActive(this.idRoom).length);
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.FIRST_TURN, idUser: this.activePlayer });
        this.updateTurn();
    }

    turn(idUser: string, valueroll: number, isDouble: boolean, cellId: number): void {
        this.isDouble = isDouble;
        chatGame.addChatMessage(this.idRoom, {
            action: EMESSAGE_CLIENT.INTO_CELL,
            idUser,
            cellId,
            valueroll
        })
    }

    private nextTurn(): void {
        if (this.isDouble) {
            this.doubleCounter++;
            this.checkDouble();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer });
        } else {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer });
        }
        this.updateTurn();
    }

    get activePlayer(): string {
        return this.playersActive[this.indexActive]
    }

    endTurn(): void {
        storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_TURN);
        this.checkWinner() ? this.nextTurn() : '';
    };

    updateTurn(idUser?: string): void {
        idUser
            ? storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.UPDATE_TURN, this.activePlayer)
            : storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.UPDATE_TURN, this.activePlayer);
    }

    private calcIndexActive(): number {
        let futureIndexActive = this.indexActive + 1;
        futureIndexActive >= this.playersActive.length ? futureIndexActive = 0 : '';
        return futureIndexActive;
    }

    private checkDouble(): void {
        if (this.doubleCounter === 3) {
            this.doubleCounter = 0;
            this.indexActive = this.calcIndexActive();
        }
    }

    checkWinner(): boolean {
        const userIds = storage_players.getPlayersActive(this.idRoom);
        if (userIds.length === 1) {
            storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_GAME, userIds[0]);
            return false;
        } else {
            return true;
        }
    };

}