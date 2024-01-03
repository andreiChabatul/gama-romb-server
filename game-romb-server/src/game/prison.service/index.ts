import { DEBT_PRISON } from "src/const";
import { EMESSAGE_CLIENT } from "src/types/chat";
import { chatGame } from "../chatGame";
import { storage_players } from "../playerStorage";
import { PrisonI } from "src/types/prisonService";

export class Prison implements PrisonI {

    addPrisoner(idRoom: string, idUser: string): void {
        storage_players.getPlayer(idRoom, idUser)
            .prison = true;
        chatGame.addChatMessage(idRoom, { action: EMESSAGE_CLIENT.GET_IN_PRISON, idUser });
    }

    deletePrisoner(idRoom: string, idUser: string): void {
        storage_players.getPlayer(idRoom, idUser)
            .prison = false;
        chatGame.addChatMessage(idRoom, { action: EMESSAGE_CLIENT.LEAVE_PRISON, idUser: idUser });
    }

    payDebt(idRoom: string, idUser: string): void {
        storage_players.getPlayer(idRoom, idUser)
            .minusTotal(DEBT_PRISON, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_PRISON);
        this.deletePrisoner(idRoom, idUser);
    }

    turnPrison(idRoom: string, idUser: string): void {
        const player = storage_players.getPlayer(idRoom, idUser);
        player.attemptPrison = player.attemptPrison - 1;
        if ((DEBT_PRISON > player.capital || DEBT_PRISON === player.capital) && player.attemptPrison === 0) {
            player.bankrupt = true
        };
    }

}

export const prison = new Prison();
