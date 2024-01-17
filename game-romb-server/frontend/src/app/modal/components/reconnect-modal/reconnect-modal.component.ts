import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ACTIONS_BUTTON, EACTION_WEBSOCKET } from 'src/app/const/enum';
import { infoRoom } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { selectReconnectRoom } from 'src/store/selectors';

@Component({
  selector: 'app-reconnect-modal',
  templateUrl: './reconnect-modal.component.html',
  styleUrls: ['./reconnect-modal.component.scss']
})
export class ReconnectModalComponent implements OnInit, OnDestroy {

  buttons: ButtonStandart[] = [
    { action: ACTIONS_BUTTON.RECONNECT_GAME, width: '12vw', height: '6vh' },
    { action: ACTIONS_BUTTON.LEAVE_GAME, width: '12vw', height: '6vh' }
  ];
  isReconnect: boolean;
  room: infoRoom | undefined;
  reconnectRoom$ = this.store.select(selectReconnectRoom);
  subcription$: Subscription;

  constructor(private store: Store<AppStore>, private webSocketController: WebSocketController) { }

  ngOnInit(): void {
    this.subcription$ = this.reconnectRoom$.subscribe((room) => this.room = room);
  }

  reconnectAccess(action: ACTIONS_BUTTON): void {
    if (action === ACTIONS_BUTTON.RECONNECT_GAME) {
      this.isReconnect = true;
      this.webSocketController.sendMessage(EACTION_WEBSOCKET.RECONNECT, { idRoom: this.room?.idRoom });
    }
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
  }

}
