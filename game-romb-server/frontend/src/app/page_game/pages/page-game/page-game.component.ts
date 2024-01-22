import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllPlayerArr, selectGameRoom } from 'src/store/selectors';
import { AppStore, gameRoom } from 'src/app/types/state';
import { fullPlayer } from 'src/app/types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-game',
  templateUrl: './page-game.component.html',
  styleUrls: ['./page-game.component.scss']
})
export class PageGameComponent implements OnInit, OnDestroy {

  gameRoom$ = this.store.select(selectGameRoom);
  players$ = this.store.select(selectAllPlayerArr);
  gameRoom: gameRoom;
  subscription$: Subscription

  constructor(private store: Store<AppStore>, private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.gameRoom$.subscribe((gameRoom) => this.gameRoom = gameRoom);
    if (!this.gameRoom.idRoom) this.router.navigate(['rooms']);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  trackByFunction(index: number, item: fullPlayer) {
    return item ? item.id : undefined;
  }

}
