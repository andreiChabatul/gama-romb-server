import { Component, Input } from '@angular/core';
import { DEBT_PRISON } from 'src/app/const';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { fullPlayer } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';

@Component({
  selector: 'app-prison-player',
  templateUrl: './prison-player.component.html',
  styleUrls: ['./prison-player.component.scss']
})
export class PrisonPlayerComponent {

  @Input() gamePlayer: fullPlayer;

  buttons: ButtonStandart[] = [
    { action: ACTIONS_BUTTON.DICE_ROLL, width: '12vw', height: '6vh' },
    { action: ACTIONS_BUTTON.PAY, width: '12vw', height: '6vh' },
    { action: ACTIONS_BUTTON.SELL_STOCK, width: '12vw', height: '6vh' },
    { action: ACTIONS_BUTTON.MORTGAGE, width: '12vw', height: '6vh' }
  ]

  checkMoney(): boolean {
    return this.gamePlayer.total < DEBT_PRISON;
  }

  checkDiceRool(): boolean {
    return !Boolean(this.gamePlayer.prison - 1);
  }

}
