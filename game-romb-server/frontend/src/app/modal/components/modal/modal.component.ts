import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EMPTY_GAME_ROOM } from 'src/app/const';
import { EACTION_WEBSOCKET } from 'src/app/const/enum';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { StartGame } from 'src/store/actions/gameActions';
import { closeModal } from 'src/store/actions/modalActions';
import { selectModal } from 'src/store/selectors';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnDestroy {

  modal$ = this.store.select(selectModal);
  subscription$: Subscription;

  constructor(private readonly store: Store<AppStore>, private webSocketController: WebSocketController, private router: Router) { }

  closeModal(): void {
    this.subscription$ = this.modal$.subscribe((modal) => {
      if (modal.modalState === 'reconnectGame') {
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.END_GAME, { action: 'leave' });
        this.store.dispatch(StartGame({ gameRoom: EMPTY_GAME_ROOM }));
        this.router.navigate(['rooms']);
      }
    });
    this.store.dispatch(closeModal());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
