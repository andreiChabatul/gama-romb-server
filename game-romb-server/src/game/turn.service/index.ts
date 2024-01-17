import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { chatGame } from "../chatGame";
import { storage_players } from "../playerStorage";
import { prison } from "../prison.service";
import { CellsServiceI } from "src/types/cellsServices";
import { UserService } from "src/user/user.service";

export class TurnService {

    private indexActive: number;
    private isDouble: boolean;
    checkPrisonUser = this.checkPrison();

    constructor(private idRoom: string, private cellsService: CellsServiceI, private userService: UserService) { }

    firstTurn(): void {
        this.indexActive = Math.floor(Math.random() * this.playersActive.length);
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.FIRST_TURN, idUser: this.activePlayer });
        this.updateTurn();
    }

    turn(idUser: string, valueroll: number, isDouble: boolean): void {
        if (this.checkPrisonUser(idUser, isDouble)) {
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN_PRISON, idUser });
            prison.addPrisoner(this.idRoom, idUser);
            this.endTurn();
            return;
        }
        this.isDouble = isDouble;
        const player = storage_players.getPlayer(this.idRoom, idUser);
        player.position = valueroll;
        const cellId = player.position;
        const cell = this.cellsService.getOneCell(cellId);
        cell.movePlayer(idUser, valueroll);
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.INTO_CELL, idUser, cellId, valueroll });
    }

    private nextTurn(): void {
        if (this.isDouble) {
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.DOUBLE_TURN, idUser: this.activePlayer });
        } else {
            this.indexActive = this.calcIndexActive();
            chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.TURN, idUser: this.activePlayer });
        };
        this.isDouble = false;
        this.updateTurn();
    }

    get activePlayer(): string {
        return this.playersActive[this.indexActive];
    }

    get playersActive(): string[] {
        return storage_players.getPlayersActive(this.idRoom);
    }

    endTurn(bankrupt: boolean = false): void {
        this.indexActive -= Number(bankrupt);
        this.checkWinner();
        // this.nextTurn();
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

    checkWinner(): void {
        if (this.playersActive.length === 1) {
            storage_WS.sendAllPlayersGame(this.idRoom, EACTION_WEBSOCKET.END_GAME, this.playersActive[0]);
            this.userService.gameWinner(this.playersActive[0]);
        } else {
            this.nextTurn();
        }
    };

    checkPrison(): (idUser: string, isDouble: boolean) => boolean {
        let amount: number = 0;
        let prevIdUser: string;
        return (idUser: string, isDouble: boolean) => {
            (isDouble && prevIdUser === idUser) ? amount++ : amount = 0;
            prevIdUser = idUser;
            return amount === 2;
        };
    }
}