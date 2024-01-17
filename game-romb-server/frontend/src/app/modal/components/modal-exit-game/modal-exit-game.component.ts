import { Component } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { ButtonStandart } from 'src/app/types/components';

@Component({
  selector: 'app-modal-exit-game',
  templateUrl: './modal-exit-game.component.html',
  styleUrls: ['./modal-exit-game.component.scss']
})
export class ModalExitGameComponent {

  leaveGameButton: ButtonStandart = { action: ACTIONS_BUTTON.LEAVE_GAME, width: '17vw', height: '3vw' };

}
