import { Component } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { ButtonStandart } from 'src/app/types/components';

@Component({
  selector: 'app-page-404',
  templateUrl: './page-404.component.html',
  styleUrl: './page-404.component.scss'
})
export class Page404Component {

  buttonMain: ButtonStandart = { action: ACTIONS_BUTTON.GO_MAIN, width: '20vw', height: '7vh' };

}
