import { Component, Input } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { fullPlayer } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { gameRoom } from 'src/app/types/state';

@Component({
  selector: 'app-player-info-inside',
  templateUrl: './player-info-inside.component.html',
  styleUrls: ['./player-info-inside.component.scss']
})
export class PlayerInfoInsideComponent {

  @Input() gameRoom: gameRoom;
  @Input() gamePlayer: fullPlayer;

  leaveGameButton: ButtonStandart = { action: ACTIONS_BUTTON.LEAVE_GAME, width: '15vw', height: '3vw' };

  get amountCompany(): number {
    return this.gameRoom.board.reduce((res, cell) =>
      res + ((cell.company && cell.company.owned === this.gamePlayer.id) ? 1 : 0), 0);
  }

}
