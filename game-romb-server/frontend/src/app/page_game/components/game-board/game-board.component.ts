import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fullPlayer, gameCell } from 'src/app/types';
import { AppStore, gameRoom } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent {

  @Input() gameRoom: gameRoom;
  @Input() players$: Observable<fullPlayer[]>;
  gamePlayer$ = this.store.select(selectGamePlayer);

  constructor(private store: Store<AppStore>) { }

  trackByFunction(index: number, item: gameCell) {
    return item ? item.nameCell : undefined;
  }

  trackByPlayer(index: number, item: fullPlayer) {
    return item ? item.id : undefined;
  }
}
