import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { DEBT_PRISON } from 'src/app/const';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { fullPlayer } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

@Component({
  selector: 'app-prison-player',
  templateUrl: './prison-player.component.html',
  styleUrls: ['./prison-player.component.scss']
})
export class PrisonPlayerComponent implements OnInit, OnDestroy {

  gamePLayer$ = this.store.select(selectGamePlayer);
  subscription$: Subscription;
  player: fullPlayer | null;

  buttons: ButtonStandart[] = [
    { action: ACTIONS_BUTTON.DICE_ROLL, width: '12vw', height: '6vh', show: this.checkDiceRool() },
    { action: ACTIONS_BUTTON.PAY, width: '12vw', height: '6vh' },
    { action: ACTIONS_BUTTON.SELL_STOCK, width: '12vw', height: '6vh' },
    { action: ACTIONS_BUTTON.MORTGAGE, width: '12vw', height: '6vh' }
  ]

  constructor(private store: Store<AppStore>) { }

  ngOnInit(): void {
    this.subscription$ = this.gamePLayer$.subscribe((player) => this.player = player);
  }

  checkMoney(): boolean {
    return Number(this.player?.total) < DEBT_PRISON;
  }

  checkDiceRool(): Observable<boolean> {
    return this.gamePLayer$.pipe(
      map((player) => Boolean(Number(player?.prison) - 1))
    )
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
