import { Component, Input } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { ButtonStandart } from 'src/app/types/components';
import { gameRoom } from 'src/app/types/state';

@Component({
  selector: 'app-control-company',
  templateUrl: './control-company.component.html',
  styleUrls: ['./control-company.component.scss']
})
export class ControlCompanyComponent {

  @Input() gameRoom: gameRoom;
  buttonFinish: ButtonStandart = { action: ACTIONS_BUTTON.END_CONTROL, width: '15vw', height: '6vh', show: true };

}
