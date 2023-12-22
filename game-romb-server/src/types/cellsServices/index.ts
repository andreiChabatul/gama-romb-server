import { cells, countryCompany } from "..";

export interface CellsServiceI {


    getAllCells(): cells[]
    getOneCell(index: number): cells;
    activateCell(index: number): void;
    reconnectPlayer(idUser: string): void;
    updateMonopoly(countryCompany: countryCompany): void;


}