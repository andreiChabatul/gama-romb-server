import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ACTIONS_BUTTON, EACTION_WEBSOCKET } from 'src/app/const/enum';
import { RoomsService } from 'src/app/rooms/rooms.services';
import { Button, InputTextFormOption, SelectFormOption } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { AddModalInfo, closeModal } from 'src/store/actions/modalActions';

@Component({
  selector: 'app-create-game-form',
  templateUrl: './create-game-form.component.html',
  styleUrls: ['./create-game-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class CreateGameFormComponent implements OnInit {

  inputForm: InputTextFormOption[] = [
    { nameForm: 'roomName', type: 'text' },
    { nameForm: 'colorPlayer', type: 'color' }
  ]

  selectsForm: SelectFormOption[] = [
    {
      nameForm: 'maxPlayers',
      optionSelect: [
        { option: 'Two', value: 2 },
        { option: 'Three', value: 3 },
        { option: 'Four', value: 4 },
        { option: 'Five', value: 5 },
        { option: 'Six', value: 6 },
        { option: 'Seven', value: 7 },
        { option: 'Eight', value: 8 }
      ]
    },
    {
      nameForm: 'timeTurn',
      optionSelect: [
        { option: '5s', value: 5000 },
        { option: '30s', value: 30000 },
        { option: '60s', value: 60000 },
        { option: '120s', value: 120000 },
        { option: '180s', value: 180000 },
        { option: '240s', value: 240000 },
        { option: '300s', value: 300000 },
      ]
    }
  ]
  createGame: FormGroup;
  textButton: Button = { action: ACTIONS_BUTTON.CREATE_GAME, width: '18vw' };

  constructor(private fb: FormBuilder,
    private webSocketController: WebSocketController,
    private router: Router,
    private store: Store<AppStore>,
    private roomsService: RoomsService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.router.navigate(['rooms']);
  }

  private createForm(): void {
    this.createGame = this.fb.group({});
  }

  onSubmit(): void {
    if (this.createGame.invalid) {
      this.createGame.markAllAsTouched()
      return;
    }

    this.roomsService.createRoom({
      roomName: this.createGame.value['roomName'].value,
      maxPlayers: Number(this.createGame.value['maxPlayers'].value),
      timeTurn: Number(this.createGame.value['timeTurn'].value),
    }).subscribe({
      next: (idRoom: string) => {
        if (idRoom) {
          this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_ROOM, {
            action: 'join',
            colorPlayer: this.createGame.value['colorPlayer'].value,
            idRoom,
          });
          this.store.dispatch(closeModal());
        }
      },
      error: (error: HttpErrorResponse) => this.store.dispatch(AddModalInfo({ modalError: error.error.message }))
    });
  }

}
