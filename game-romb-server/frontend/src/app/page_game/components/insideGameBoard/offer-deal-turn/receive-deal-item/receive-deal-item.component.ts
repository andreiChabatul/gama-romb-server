import { Component, Input, OnInit } from '@angular/core';
import { offerInfo } from 'src/app/types';
import { dealPerson, fullPlayer, gameCell } from 'src/app/types';
import { gameRoom } from 'src/app/types/state';

@Component({
  selector: 'app-receive-deal-item',
  templateUrl: './receive-deal-item.component.html',
  styleUrls: ['./receive-deal-item.component.scss']
})
export class ReceiveDealItemComponent implements OnInit {

  @Input() gameRoom: gameRoom;
  @Input() dealPerson: dealPerson;
  offerInfo: offerInfo | undefined;

  ngOnInit(): void {
    this.offerInfo = this.gameRoom.offerDealInfo ? this.gameRoom.offerDealInfo[this.dealPerson] : undefined;
  }

  get player(): fullPlayer {
    return this.gameRoom.players[String(this.offerInfo?.idPerson)];
  }

  get companyPlayer(): gameCell[] {
    return this.gameRoom.board.filter((cell) =>
      this.offerInfo?.indexCompany.includes(cell.indexCell));
  }

}
