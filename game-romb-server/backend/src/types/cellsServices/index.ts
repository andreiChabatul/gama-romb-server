import {
  CompanyInfo,
  controlCompany,
  countryCompany,
  updateInfoCompany,
} from '..';

export type cells = CellCompanyI | CellDefault;
export interface CellsServiceI {
  getOneCell(index: number): cells;
  activateCell(index: number, idUser: string): void;
  reconnectPlayer(idUser: string): void;
  updateMonopoly(countryCompany: countryCompany): void;
  playerBankrupt(idUser: string): void;
  calcCapitalCells(idUser: string): number;
}

export interface CellDefault {
  _cellValue?: number;
  movePlayer(idUser: string, valueRoll?: number): void;
  get index(): number;
  activateCell(idUser: string): void;
  sendInfoPlayer(idUser?: string): void;
}

export interface CellCompanyI extends CellDefault {
  controlCompany(action: controlCompany, idUser: string): void;
  buyCompany(idUser: string, price: number): void;
  payRent(idUser: string): void;
  get owned(): string | null;
  set owned(player: string);
  get info(): updateInfoCompany;
  get infoCompany(): CompanyInfo;
  get rentCompany(): number;
  get pledge(): boolean;
  get quantityStock(): number;
  set quantityStock(value: number);
  set monopoly(value: boolean);
}
