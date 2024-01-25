import { Component, Input } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { Button } from 'src/app/types/components';
import { controlCompanyState } from 'src/app/types/state';

@Component({
  selector: 'app-control-company',
  templateUrl: './control-company.component.html',
  styleUrls: ['./control-company.component.scss']
})
export class ControlCompanyComponent {

  @Input() state: controlCompanyState;
  buttonFinish: Button = { action: ACTIONS_BUTTON.END_CONTROL, width: '15vw' };

}
