import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EACTION_WEBSOCKET } from 'src/app/const/enum';
import { CompanyInfo, cellDirections, fullPlayer, gameCell } from 'src/app/types';
import { AppStore, controlCompany } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { ControlCompanyStock } from 'src/store/actions/gameActions';

type controlButtons = { show: boolean, value: number | undefined };

@Component({
  selector: 'app-game-cell-company',
  templateUrl: './game-cell-company.component.html',
  styleUrls: ['./game-cell-company.component.scss']
})
export class GameCellCompanyComponent implements OnChanges, OnInit {

  @Input() gameCell: gameCell;
  @Input() controlCompany: controlCompany;
  @Input() gamePlayer: fullPlayer;
  companyInfo: CompanyInfo | undefined;
  cellDirections: cellDirections;
  noCompanySell = ['japan', 'ukraine'];
  controlButtons: controlButtons[];

  constructor(private webSocketController: WebSocketController, private store: Store<AppStore>) { }

  ngOnInit(): void {
    this.cellDirections = this.gameCell.location.cellDirections;
  }

  ngOnChanges(): void {
    this.companyInfo = this.gameCell.company;
    this.controlButtons = [
      { show: this.checkBuyStock(), value: this.companyInfo?.priceStock },
      { show: this.checkSellStock(), value: this.companyInfo?.priceStock },
      { show: this.checkMortage(), value: this.companyInfo?.collateralCompany },
      { show: this.checkBuyOut(), value: this.companyInfo?.buyBackCompany }
    ];
  }

  controlCompanyClick(event: MouseEvent) {
    this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_COMPANY, {
      indexCompany: this.gameCell.indexCell,
      action: this.controlCompany.state
    });
    event.stopPropagation();
    if (this.controlCompany.state === 'buyStock') {
      this.store.dispatch(ControlCompanyStock({ noSellStock: String(this.companyInfo?.countryCompany) }));
    }
  }

  checkBuyStock(): boolean {
    return Boolean(this.controlCompany.state === 'buyStock' &&
      this.checkPlayerOwned() &&
      !this.companyInfo?.isPledge &&
      this.companyInfo?.isMonopoly &&
      Number(this.companyInfo?.shares) < 5 &&
      Number(this.gamePlayer?.total) >= Number(this.companyInfo?.priceStock) &&
      !this.controlCompany.noSellStock.includes(String(this.companyInfo?.countryCompany))
    );
  }

  checkMortage(): boolean {
    return this.controlCompany.state === 'pledgeCompany' && this.checkPlayerOwned() && !this.companyInfo?.isPledge;
  }

  checkBuyOut(): boolean {
    return Boolean(this.controlCompany.state === 'buyOutCompany' &&
      this.checkPlayerOwned() &&
      Number(this.gamePlayer?.total) >= Number(this.companyInfo?.buyBackCompany) &&
      this.companyInfo?.isPledge);
  }

  checkSellStock(): boolean {
    return this.controlCompany.state === 'sellStock' &&
      this.checkPlayerOwned() &&
      !['japan', 'ukraine'].includes(String(this.companyInfo?.countryCompany)) &&
      Number(this.companyInfo?.shares) > 0;
  }

  checkPlayerOwned(): boolean {
    return this.gamePlayer.id === this.companyInfo?.owned;
  }

}
