import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ACTIONS_BUTTON, EACTION_WEBSOCKET } from 'src/app/const/enum';
import { ButtonStandart, InputTextFormOption } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { closeModal } from 'src/store/actions/modalActions';
import { selectModal } from 'src/store/selectors';

@Component({
  selector: 'app-modal-join-game',
  templateUrl: './modal-join-game.component.html',
  styleUrls: ['./modal-join-game.component.scss']
})
export class ModalJoinGameComponent implements OnInit, OnDestroy {

  choiseColor: InputTextFormOption = { nameForm: 'colorPlayer', type: 'color' };
  joinGame: FormGroup;
  modal$ = this.store.select(selectModal);
  subscription$: Subscription;
  idRoomJoin: string;
  joinButton: ButtonStandart = { action: ACTIONS_BUTTON.JOIN_ITEM_GAME, height: '4vw', width: '18vw' };

  constructor(private fb: FormBuilder, private webSocketController: WebSocketController, private store: Store<AppStore>) {
    this.createForm();
  }

  private createForm(): void {
    this.joinGame = this.fb.group({});
  }

  ngOnInit(): void {
    this.subscription$ = this.modal$.subscribe((modal) => this.idRoomJoin = String(modal.payload));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit(): void {
    this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_ROOM, {
      action: 'join',
      idRoom: this.idRoomJoin,
      colorPlayer: this.joinGame.value['colorPlayer'].value,
    });
    this.store.dispatch(closeModal());
  }
}

