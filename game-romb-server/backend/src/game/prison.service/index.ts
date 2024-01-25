import { DEBT_PRISON } from 'src/const';
import { EMESSAGE_CLIENT } from 'src/types/chat';
import { chatGame } from '../chatGame';
import { storage_players } from '../playerStorage';
import { PRISON_STATE, PrisonI } from 'src/types/prisonService';

export class Prison implements PrisonI {
  addPrisoner(idRoom: string, idUser: string): void {
    storage_players.getPlayer(idRoom, idUser).prison = PRISON_STATE.GoInPrison;
    chatGame.addChatMessage(idRoom, {
      action: EMESSAGE_CLIENT.GET_IN_PRISON,
      idUser,
    });
  }

  deletePrisoner(idRoom: string, idUser: string): void {
    storage_players.getPlayer(idRoom, idUser).prison = PRISON_STATE.GoOutPrison;
    chatGame.addChatMessage(idRoom, {
      action: EMESSAGE_CLIENT.LEAVE_PRISON,
      idUser: idUser,
    });
  }

  payDebt(idRoom: string, idUser: string): void {
    storage_players
      .getPlayer(idRoom, idUser)
      .minusTotal(DEBT_PRISON, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_PRISON);
    this.deletePrisoner(idRoom, idUser);
  }

  turnPrison(idRoom: string, idUser: string): void {
    const player = storage_players.getPlayer(idRoom, idUser);
    player.prison = player.prison - 1;
    if (
      (DEBT_PRISON > player.capital || DEBT_PRISON === player.capital) &&
      player.prison === 1
    ) {
      player.bankrupt = true;
    }
  }
}

export const prison = new Prison();
