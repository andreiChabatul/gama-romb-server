import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { fullPlayer, gameCell, offerInfo, dealPerson } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectGameRoom } from 'src/store/selectors';

@Component({
  selector: 'app-offer-deal-item',
  templateUrl: './offer-deal-item.component.html',
  styleUrls: ['./offer-deal-item.component.scss']
})
export class OfferDealItemComponent implements OnInit {

  @Input() idUser: string | null;
  @Input() dealPerson: dealPerson;
  @Output() offerEvent = new EventEmitter<{ dealPerson: dealPerson, offerInfo: offerInfo }>();
  gameRoom$ = this.store.select(selectGameRoom);
  _offerInfo: offerInfo = {} as offerInfo;

  constructor(private store: Store<AppStore>) {
    this.formatLabel = this.formatLabel.bind(this);
  }

  ngOnInit(): void {
    this._offerInfo = {
      idPerson: this.idUser ? this.idUser : '',
      indexCompany: [],
      valueMoney: 0
    }
  }

  searchIndexCompany(idCompany: number): number {
    return this._offerInfo.indexCompany.indexOf(idCompany);
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      this.valueMoney = value;
      return '$' + Math.round(value);
    }
    return `${value}`;
  }

  set valueMoney(valueMoney: number) {
    this._offerInfo.valueMoney = valueMoney;
    this.sendItemOffer();
  }

  set company(idCompany: number) {
    const resultArr = [...this._offerInfo.indexCompany]
    const indexSelect = this.searchIndexCompany(idCompany);
    (indexSelect === -1)
      ? resultArr.push(idCompany)
      : resultArr.splice(indexSelect, 1);
    this._offerInfo.indexCompany = resultArr;
    this.sendItemOffer();
  }

  get player(): Observable<fullPlayer> {
    return this.gameRoom$.pipe(
      map((gameRoom) => gameRoom.players[String(this.idUser)])
    )
  }

  get companyPlayer(): Observable<gameCell[]> {
    return this.gameRoom$.pipe(
      map((gameRoom) =>
        gameRoom.board.filter((cell) => !cell.company?.isPledge && cell.company?.owned === this.idUser))
    );
  }

  sendItemOffer(): void {
    this.offerEvent.emit({ dealPerson: this.dealPerson, offerInfo: this._offerInfo });
  }

}
