import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { fullPlayer } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { AppStore, gameRoom } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

@Component({
  selector: 'app-player-info-inside',
  templateUrl: './player-info-inside.component.html',
  styleUrls: ['./player-info-inside.component.scss']
})
export class PlayerInfoInsideComponent implements OnInit, OnDestroy {

  @Input() gameRoom: gameRoom;
  player$ = this.store.select(selectGamePlayer);
  player: fullPlayer | null;
  subscription$: Subscription;
  leaveGameButton: ButtonStandart = { action: ACTIONS_BUTTON.LEAVE_GAME, width: '15vw', height: '3vw' };

  constructor(private store: Store<AppStore>) { }

  ngOnInit(): void {
    this.subscription$ = this.player$.subscribe((player) => this.player = player)
  }

  get amountCompany(): number {
    return this.gameRoom.board.reduce((res, cell) =>
      res + ((cell.company && cell.company.owned === this.player?.id) ? 1 : 0), 0);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
