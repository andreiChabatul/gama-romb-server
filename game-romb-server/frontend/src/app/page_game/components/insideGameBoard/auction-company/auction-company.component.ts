import { Component, Input, OnChanges } from '@angular/core';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { gameCell, infoAuction } from 'src/app/types';
import { Button } from 'src/app/types/components';
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
  winner: string;
  rentCompany: number;
  buttonsAuction: Button[] = [
    { action: ACTIONS_BUTTON.AUCTION_STEP, width: '14vw' },
    { action: ACTIONS_BUTTON.AUCTION_LEAVE, width: '14vw' },
  ];

  ngOnChanges(): void {
    if (this.gameRoom?.infoAuction) {
      this.infoAuction = this.gameRoom.infoAuction;
      this.gameCell = this.gameRoom.board[this.gameRoom.infoAuction.indexCompany];
      this.rentCompany = Number(this.gameCell.company?.rentCompanyInfo[0]);
      this.winner = this.infoAuction.currentPlayer ? this.gameRoom.players[this.infoAuction.currentPlayer].nickName : 'noWinner'
    }
  }

}
