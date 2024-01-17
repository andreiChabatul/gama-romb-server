import { Component, Input } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { offerDealInfo } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';

@Component({
  selector: 'app-receive-deal',
  templateUrl: './receive-deal.component.html',
  styleUrls: ['./receive-deal.component.scss']
})
export class ReceiveDealComponent {

  @Input() offerDealInfo: offerDealInfo | undefined;
  buttonDeal: ButtonStandart[] = [
    { action: ACTIONS_BUTTON.ACCEPT_DEAL, width: '12vw', height: '5vh', show: true },
    { action: ACTIONS_BUTTON.REFUSE_DEAL, width: '12vw', height: '5vh', show: true }];

}
