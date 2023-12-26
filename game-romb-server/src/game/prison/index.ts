import { TurnService } from "../turn.service";
import { DEBT_PRISON } from "src/const";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { chatGame } from "../chatGame";
import { PlayerDefaultI, PrisonI } from "src/types/player";

export class Prison implements PrisonI {

    constructor(private idRoom: string, private turnService: TurnService) { }

    addPrisoner(player: PlayerDefaultI): void {
        player.prison = true;
        player.position = 12;
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.GET_IN_PRISON, idUser: player.userId });
    }

    deletePrisoner(player: PlayerDefaultI): void {
        player.prison = false;
        chatGame.addChatMessage(this.idRoom, { action: EMESSAGE_CLIENT.LEAVE_PRISON, idUser: player.userId });
        this.turnService.endTurn();
    }

    payDebt(player: PlayerDefaultI): void {
        console.log(player.playerInfo)
        player.minusTotal(DEBT_PRISON, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_PRISON);
        this.deletePrisoner(player);
    }

    turnPrison(player: PlayerDefaultI): void {
        player.attemptPrison = player.attemptPrison - 1;
        ((DEBT_PRISON > player.capital || DEBT_PRISON === player.capital) && player.attemptPrison === 0)
            ? player.bankrupt = true : '';
        this.turnService.endTurn();
    }

}
