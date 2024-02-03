import { Component } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { Button } from 'src/app/types/components';

@Component({
  selector: 'app-modal-demo',
  templateUrl: './modal-demo.component.html',
  styleUrl: './modal-demo.component.scss'
})
export class ModalDemoComponent {

  demoGameButton: Button = { action: ACTIONS_BUTTON.GO_DEMO, width: '20vw' };

}
