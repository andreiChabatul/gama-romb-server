import { CompanyInfo, controlCompany, countryCompany, updateInfoCompany } from "..";
import { PlayerDefaultI } from "../player";

export type cells = CellCompanyI | CellDefault;
export interface CellsServiceI {
    getAllCells(): cells[]
    getOneCell(index: number): cells;
    activateCell(index: number, idUser: string): void;
    reconnectPlayer(idUser: string): void;
    updateMonopoly(countryCompany: countryCompany): void;
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
    buyCompany(player: PlayerDefaultI, price: number): void;
    payRent(ownedPlayer: PlayerDefaultI): void;
    get owned(): string | null;
    get info(): updateInfoCompany;
    get infoCompany(): CompanyInfo;
    get rentCompany(): number;
    get pledge(): boolean;
    get quantityStock(): number;
    set monopoly(value: boolean);
    set quantityStock(value: number);
    set owned(player: string);
}