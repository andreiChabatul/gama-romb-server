import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { gameCell, infoCellButtons, infoCellTurn } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { AppStore, gameRoom } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

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
  buttonsResult: ButtonStandart[] = [];
  infoCellTurn: infoCellTurn | undefined;
  gamePlayer$ = this.store.select(selectGamePlayer);
  cell: gameCell;

  constructor(private store: Store<AppStore>) { }

  ngOnInit(): void {
    if (this.gameRoom.infoCellTurn) {
      this.infoCellTurn = this.gameRoom.infoCellTurn;
      this.buttonsResult = this.updateButtons(this.infoCellTurn.buttons);
      this.cell = this.gameRoom.board[this.gameRoom.infoCellTurn.indexCompany];
    };
  }

  isPay(): Observable<Boolean> {
    return this.gamePlayer$.pipe(
      map((fullPlayer) => Number(fullPlayer?.total) < Number(this.infoCellTurn?.value))
    )
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
    };
  }

}
