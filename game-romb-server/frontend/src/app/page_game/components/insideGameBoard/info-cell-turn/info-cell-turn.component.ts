import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { fullPlayer, gameCell, infoCellButtons } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { gameRoom } from 'src/app/types/state';

const buttons: ButtonStandart[] = [
  { action: ACTIONS_BUTTON.PAY, width: '13vw', height: '6vh' },
  { action: ACTIONS_BUTTON.SELL_STOCK, width: '13vw', height: '6vh' },
  { action: ACTIONS_BUTTON.MORTGAGE, width: '13vw', height: '6vh' },
  { action: ACTIONS_BUTTON.BUY_COMPANY, width: '13vw', height: '6vh' },
  { action: ACTIONS_BUTTON.START_AUCTION, width: '13vw', height: '6vh' },
  { action: ACTIONS_BUTTON.LEAVE_GAME, width: '13vw', height: '6vh' },
  { action: ACTIONS_BUTTON.STAY_GAME, width: '13vw', height: '6vh' },
]

@Component({
  selector: 'app-info-cell-turn',
  templateUrl: './info-cell-turn.component.html',
  styleUrls: ['./info-cell-turn.component.scss'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class InfoCellTurnComponent implements OnInit {

  @Input() gameRoom: gameRoom;
  @Input() gamePlayer: fullPlayer;
  buttonsResult: ButtonStandart[] = [];
  cell: gameCell;

  ngOnInit(): void {
    if (this.gameRoom.infoCellTurn) {
      this.buttonsResult = this.updateButtons(this.gameRoom.infoCellTurn.buttons);
      this.cell = this.gameRoom.board[this.gameRoom.infoCellTurn.indexCompany];
    }
  }

  isPay(): boolean {
    return this.gamePlayer.total < Number(this.gameRoom.infoCellTurn?.value)
  }

  private updateButtons(type: infoCellButtons): ButtonStandart[] {
    switch (type) {
      case 'none':
        return [];
      case 'pay':
        return [0, 1, 2].map((index) => buttons[index]);
      case 'buy':
        return [3, 4].map((index) => buttons[index]);
      case 'bankrupt':
        return [5, 6].map((index) => buttons[index]);
      default:
        return [];
    }
  }

}
