import { ChatI, PlayerDefaultI, PrisonI } from "src/types";
import { TurnService } from "../turn.service";
import { TIME_TURN_DEFAULT } from "src/app/const";
import { EMESSAGE_CLIENT } from "src/app/const/enum";

export class Prison implements PrisonI {

    constructor(
        private turnService: TurnService,
        private chat: ChatI) { }

    addPrisoner(player: PlayerDefaultI): void {
        player.prison = true;
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.GET_IN_PRISON, playerId: player.userId });
        setTimeout(() => player.position = 12, TIME_TURN_DEFAULT);
    }

    deletePrisoner(player: PlayerDefaultI): void {
        player.prison = false;
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.LEAVE_PRISON, playerId: player.userId });
        this.turnService.endTurn();
    }

    turnPrison(player: PlayerDefaultI, value: number, isDouble: boolean): void {
        if (isDouble) {
            this.deletePrisoner(player);
            this.turnService.turn(player, value, false);
        } else {
            player.attemptPrison = true;
            this.turnService.endTurn();
        }
    }
}
