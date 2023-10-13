import { PlayerDefaultI, PrisonI, infoCellTurn } from "src/types";
import { TurnService } from "../turn.service";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";
import { DEBT_PRISON } from "src/app/const";

export class Prison implements PrisonI {

    prisoners: { [id: string]: number } = {}

    constructor(
        private turnService: TurnService,
        private roomWS: Room_WS) { }


    addPrisoner(player: PlayerDefaultI): void {
        player.prison = true;
        this.prisoners[player.userId] = 3;
        setTimeout(() => player.position = 12, 1500);
        this.updatePrison(player.userId);
    }

    deletePrisoner(player: PlayerDefaultI): void {
        player.prison = false;
        console.log('вышел из тюрьмы');
    }

    turnPrison(player: PlayerDefaultI, value: number, isDouble: boolean): void {
        if (isDouble) {
            this.deletePrisoner(player);
            this.turnService.turn(player, value, false);
        } else {
            this.prisoners[player.userId]--;
            this.updatePrison(player.userId);
            this.turnService.endTurn();
        }
    }

    updatePrison(userId: string): void {
        this.roomWS.sendOnePlayer(userId, EACTION_WEBSOCKET.PRISON, { attemp: this.prisoners[userId] });
    }
}