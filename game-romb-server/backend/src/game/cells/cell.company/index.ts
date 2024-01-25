import {
  CompanyInfo,
  controlCompany,
  infoCellTurn,
  updateInfoCompany,
  countryCompany,
} from 'src/types';
import { EACTION_WEBSOCKET } from 'src/types/websocket';
import { storage_WS } from 'src/game/socketStorage';
import { EMESSAGE_CLIENT } from 'src/types/chat';
import { storage_players } from 'src/game/playerStorage';
import { CellCompanyI } from 'src/types/cellsServices';

export class CellCompany implements CellCompanyI {
  private _pledge: boolean;
  private _owned: string | undefined;
  private _monopoly: boolean;
  private _quantityStock: number;
  private _valueRoll: number;

  constructor(
    private _index: number,
    private _idRoom: string,
    private compnanyInfo: CompanyInfo,
    private updateMonopoly: (countryCompany: countryCompany) => void,
  ) {
    this._quantityStock = 0;
    this._monopoly = false;
  }

  movePlayer(idUser: string, valueRoll?: number): void {
    const player = storage_players.getPlayer(this._idRoom, idUser);
    this._valueRoll = valueRoll;
    const payload: infoCellTurn = {
      indexCompany: this._index,
      description: '',
      buttons: 'none',
      value: this.rentFact,
    };

    if (idUser === this._owned) {
      payload.description = EMESSAGE_CLIENT.OWNED_COMPANY;
    } else if (this._pledge) {
      payload.description = EMESSAGE_CLIENT.PLEDGE_COMPANY;
    } else if (this._owned && idUser !== this._owned && !this._pledge) {
      payload.description = EMESSAGE_CLIENT.RENT_COMPANY;
      payload.buttons = 'pay';
      if (player.capital <= this.rentFact) {
        player.bankrupt = true;
        payload.buttons = 'bankrupt';
      }
    } else if (!this._owned && player.total > this.compnanyInfo.priceCompany) {
      payload.description = EMESSAGE_CLIENT.BUY_COMPANY;
      payload.buttons = 'buy';
    } else {
      payload.description = EMESSAGE_CLIENT.AUCTION_COMPANY;
      payload.buttons = 'auction';
    }
    storage_WS.sendOnePlayerGame(
      this._idRoom,
      idUser,
      EACTION_WEBSOCKET.INFO_CELL_TURN,
      payload,
    );
  }

  activateCell(idUser: string): void {
    const player = storage_players.getPlayer(this._idRoom, idUser);

    if (idUser === this._owned || this._pledge) {
      return;
    } else if (this._owned && idUser !== this._owned && !this._pledge) {
      this.payRent(idUser);
    } else if (!this._owned && player.total > this.compnanyInfo.priceCompany) {
      this.buyCompany(idUser);
    }
  }

  buyCompany(
    idUser: string,
    price: number = this.compnanyInfo.priceCompany,
  ): void {
    const player = storage_players.getPlayer(this._idRoom, idUser);
    this.owned = idUser;

    player.minusTotal(
      price,
      EMESSAGE_CLIENT.MINUS_TOTAL_BUY_COMPANY,
      this._index,
    );
    this.sendInfoPlayer();
  }

  payRent(idUser: string): void {
    const payer = storage_players.getPlayer(this._idRoom, idUser);
    const owned = storage_players.getPlayer(this._idRoom, this._owned);
    const debtRent =
      this.rentFact >= payer.capital ? payer.capital : this.rentFact;

    owned.addTotal(debtRent);
    payer.minusTotal(debtRent, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_RENT);
  }

  get info(): updateInfoCompany {
    return {
      rentCompany: this.rentCompany,
      isPledge: this._pledge,
      isMonopoly: this._monopoly,
      shares: this._quantityStock,
      owned: this.owned,
    };
  }

  get rentCompany(): number {
    const rentIndex = Number(this._monopoly) + this._quantityStock;
    return this.compnanyInfo.rentCompanyInfo[rentIndex];
  }

  get rentFact(): number {
    return this.compnanyInfo.countryCompany === 'ukraine'
      ? this.rentCompany * this._valueRoll
      : this.rentCompany;
  }

  get owned(): string | undefined {
    return this._owned;
  }

  set owned(userId: string) {
    this._owned = userId;
    this._pledge = false;
    this._quantityStock = 0;
    this.updateMonopoly(this.compnanyInfo.countryCompany);
    this.sendInfoPlayer();
  }

  get infoCompany(): CompanyInfo {
    return this.compnanyInfo;
  }

  get index(): number {
    return this._index;
  }

  get pledge(): boolean {
    return this._pledge;
  }

  set pledge(value: boolean) {
    this._pledge = value;
    this.updateMonopoly(this.compnanyInfo.countryCompany);
  }

  set monopoly(value: boolean) {
    if (value !== this._monopoly) {
      this._monopoly = value;
      this.sendInfoPlayer();
    }
  }

  set quantityStock(value: number) {
    this._quantityStock = value;
    this.sendInfoPlayer();
  }

  get quantityStock(): number {
    return this._quantityStock;
  }

  controlCompany(action: controlCompany, idUser: string): void {
    const player = storage_players.getPlayer(this._idRoom, idUser);
    switch (action) {
      case 'buyStock':
        this._quantityStock += 1;
        player.minusTotal(this.compnanyInfo.priceStock);
        break;
      case 'sellStock':
        this._quantityStock -= 1;
        player.addTotal(this.compnanyInfo.priceStock);
        break;
      case 'pledgeCompany':
        this.pledge = true;
        player.addTotal(this.compnanyInfo.collateralCompany);
        break;
      case 'buyOutCompany':
        this.pledge = false;
        player.minusTotal(this.compnanyInfo.buyBackCompany);
        break;
      default:
        break;
    }
    this.sendInfoPlayer();
  }

  sendInfoPlayer(idUser?: string): void {
    const payload = {
      indexCell: this._index,
      company: this.info,
    };
    idUser
      ? storage_WS.sendOnePlayerGame(
          this._idRoom,
          idUser,
          EACTION_WEBSOCKET.UPDATE_CELL,
          payload,
        )
      : storage_WS.sendAllPlayersGame(
          this._idRoom,
          EACTION_WEBSOCKET.UPDATE_CELL,
          payload,
        );
  }
}
