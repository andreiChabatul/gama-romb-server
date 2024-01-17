import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTIONS_BUTTON, EACTION_WEBSOCKET } from 'src/app/const/enum';
import { offerInfo, gameCell, offerDealInfo, dealPerson } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { AppStore, gameRoom } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { selectAllPlayerArr, selectPlayerTurnId } from 'src/store/selectors';

@Component({
  selector: 'app-offer-deal',
  templateUrl: './offer-deal.component.html',
  styleUrls: ['./offer-deal.component.scss']
})
export class OfferDealComponent {

  @Input() gameRoom: gameRoom;
  players$ = this.store.select(selectAllPlayerArr);
  turnId$ = this.store.select(selectPlayerTurnId);
  _offerDealInfo: offerDealInfo = {} as offerDealInfo;
  _isAwaitSoluton: boolean;
  _userIdReceiver: string = '';

  buttonOffer: ButtonStandart[] = [
    { action: ACTIONS_BUTTON.SEND_DEAL, width: '12vw', height: '5vh', show: false },
    { action: ACTIONS_BUTTON.CANSEL_DEAL, width: '12vw', height: '5vh', show: true }];

  constructor(private store: Store<AppStore>, private webSocketController: WebSocketController) {
    this._isAwaitSoluton = true;
  }

  selectPlayer(userId: string): void {
    this.calcBalanse();
    this._userIdReceiver = userId;
    this.buttonOffer[0] = { ...this.buttonOffer[0], show: this._userIdReceiver }
  }

  calcBalanse(): number {
    const sumCompany = (board: gameCell[], offerInfo: offerInfo): number =>
      offerInfo
        ? board.reduce((prev, cur) =>
          offerInfo.indexCompany.includes(cur.indexCell)
            ? prev + Number(cur.company?.priceCompany)
            : prev,
          (offerInfo ? offerInfo.valueMoney : 0))
        : 0;

    const sumOffer = sumCompany(this.gameRoom.board, this._offerDealInfo.offerPerson);
    const sumReceive = sumCompany(this.gameRoom.board, this._offerDealInfo.receivePerson);
    let result = sumOffer / sumReceive;
    result = result > 2 ? 2 : result;
    return result = result < 0 ? 0 : result;
  }

  textBalanse(): string {
    const result = this.calcBalanse();
    return isNaN(result)
      ? 'nanResult'
      : (result > 0.8 && result < 1.2) ? 'balanseDeal' : 'noBalanseDeal';
  }

  clickButton(action: ACTIONS_BUTTON): void {
    if (action === 'sendDealButton') {
      this._isAwaitSoluton = false;
      this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_DEAL, {
        action: 'offer',
        offerDealInfo: this._offerDealInfo
      });
    }
  }

  setOffer(event: { dealPerson: dealPerson, offerInfo: offerInfo }) {
    this._offerDealInfo[event.dealPerson] = event.offerInfo;
  }
}
