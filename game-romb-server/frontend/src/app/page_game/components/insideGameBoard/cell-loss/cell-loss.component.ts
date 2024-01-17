import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { infoCellTurn } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

@Component({
  selector: 'app-cell-loss',
  templateUrl: './cell-loss.component.html',
  styleUrls: ['./cell-loss.component.scss']
})
export class CellLossComponent {

  @Input() infoCellTurn: infoCellTurn | undefined | null;
  gamePlayer$ = this.store.select(selectGamePlayer);

  constructor(private store: Store<AppStore>) { }

  checkEnoughMoney(): Observable<string> {
    return this.gamePlayer$.pipe(
      map((player) =>
        (player && player.total > Number(this.infoCellTurn?.value))
          ? 'enoughMoney'
          : 'noEnoughMoney')
    )
  }

}