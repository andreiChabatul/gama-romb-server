import { Component, Input, OnChanges } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { gameCell, infoAuction } from 'src/app/types';
import { ButtonStandart } from 'src/app/types/components';
import { gameRoom } from 'src/app/types/state';

@Component({
  selector: 'app-auction-company',
  templateUrl: './auction-company.component.html',
  styleUrls: ['./auction-company.component.scss']
})
export class AuctionCompanyComponent implements OnChanges {

  @Input() gameRoom: gameRoom | undefined;
  infoAuction: infoAuction;
  gameCell: gameCell | null;
  rentCompany: number;
  buttonsAuction: ButtonStandart[] = [
    { action: ACTIONS_BUTTON.AUCTION_STEP, width: '14vw', height: '5vh' },
    { action: ACTIONS_BUTTON.AUCTION_LEAVE, width: '14vw', height: '5vh' },
  ];

  ngOnChanges(): void {
    if (this.gameRoom?.infoAuction) {
      this.infoAuction = this.gameRoom?.infoAuction;
      this.gameCell = this.gameRoom.board[this.gameRoom.infoAuction.indexCompany];
      this.rentCompany = Number(this.gameCell.company?.rentCompanyInfo[0]);
    }
  }

}
