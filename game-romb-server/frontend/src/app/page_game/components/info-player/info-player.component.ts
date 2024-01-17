import { Component, Input, OnChanges, SimpleChanges, } from '@angular/core';
import { Store } from '@ngrx/store';
import { fullPlayer } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectPlayerTurnId } from 'src/store/selectors';

@Component({
  selector: 'app-info-player',
  templateUrl: './info-player.component.html',
  styleUrls: ['./info-player.component.scss']
})
export class InfoPlayerComponent implements OnChanges {

  @Input() player: fullPlayer;
  prevTotal: number;
  prevCapital: number;

  playerTurnId$ = this.store.select(selectPlayerTurnId);

  constructor(private store: Store<AppStore>) { }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      const chng = changes[propName];
      this.prevTotal = chng.previousValue ? chng.previousValue.total : 0;
      this.prevCapital = chng.previousValue ? chng.previousValue.capital : 0;
    }
  }

}
