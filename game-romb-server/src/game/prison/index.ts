import { ChatI, PlayerDefaultI, PrisonI } from "src/types";
import { TurnService } from "../turn.service";
import { DEBT_PRISON } from "src/app/const";
import { EMESSAGE_CLIENT } from "src/app/const/enum";

export class Prison implements PrisonI {

    constructor(private turnService: TurnService, private chat: ChatI) { }

    addPrisoner(player: PlayerDefaultI): void {
        player.prison = true;
        player.position = 12;
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.GET_IN_PRISON, playerId: player.userId });
    }

    deletePrisoner(player: PlayerDefaultI): void {
        player.prison = false;
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.LEAVE_PRISON, playerId: player.userId });
        this.turnService.endTurn();
    }

    payDebt(player: PlayerDefaultI): void {
        player.minusTotal(DEBT_PRISON, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_PRISON);
        this.deletePrisoner(player);
    }

    turnPrison(player: PlayerDefaultI, value: number, isDouble: boolean): void {

        if (isDouble) {
            this.deletePrisoner(player);
            this.turnService.turn(player, value, false);
        } else {
            player.attemptPrison = player.attemptPrison - 1;
            ((DEBT_PRISON > player.capital || DEBT_PRISON === player.capital) && player.attemptPrison === 0)
                ? player.bankrupt = true : '';
            this.turnService.endTurn();
        };
    }


}
