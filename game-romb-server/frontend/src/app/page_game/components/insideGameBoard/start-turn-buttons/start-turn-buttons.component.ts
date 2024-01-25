import { Component, OnInit, Input } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { fullPlayer } from 'src/app/types';
import { Button } from 'src/app/types/components';
import { gameRoom } from 'src/app/types/state';


@Component({
  selector: 'app-start-turn-buttons',
  templateUrl: './start-turn-buttons.component.html',
  styleUrls: ['./start-turn-buttons.component.scss']
})
export class StartTurnButtonsComponent implements OnInit {

  @Input() gameRoom: gameRoom;
  @Input() gamePlayer: fullPlayer;
  isBuyStock: boolean;
  isBuyOut: boolean;

  buttons: Button[] = [
    { action: ACTIONS_BUTTON.DICE_ROLL, width: '17vw' },
    { action: ACTIONS_BUTTON.OFFER_DEAL, width: '17vw' },
    { action: ACTIONS_BUTTON.BUY_STOCK, width: '17vw' },
    { action: ACTIONS_BUTTON.BUY_OUT_COMPANY, width: '17vw' },
  ]

  ngOnInit(): void {
    this.gameRoom.board.forEach((cell) => {
      if (cell.company?.owned === this.gamePlayer.id) {
        cell.company?.isMonopoly ? this.isBuyStock = true : '';
        cell.company?.isPledge ? this.isBuyOut = true : '';
      }
    })
  }

}
