import { countryCompany } from "src/types"
import { defaultCell } from "./defaultCell";
import { CellEmpty } from "./cell.empty";
import { CellCompany } from "./cell.company";
import { CellTax } from "./cell.tax";
import { CellProfit } from "./cell.profit";
import { CellLoss } from "./cell.loss";
import { CellCompanyI, CellsServiceI, cells } from "src/types/cellsServices";

export class CellsService implements CellsServiceI {

    cells: cells[];

    constructor(idRoom: string) {
        this.cells = defaultCell.map((cell, indexCell) => {
            switch (cell.type) {
                case "company":
                    return new CellCompany(indexCell, idRoom, cell.company, this.updateMonopoly.bind(this));
                case "empty":
                    return new CellEmpty(indexCell, idRoom, cell.nameCell);
                case "tax":
                    return new CellTax(indexCell, idRoom, cell.nameCell);
                case "profit":
                    return new CellProfit(indexCell, idRoom);
                case "loss":
                    return new CellLoss(indexCell, idRoom);
                default:
                    break;
            }
        });
    }

    getOneCell(index: number): cells {
        return this.cells[index];
    }

    activateCell(index: number, idUser: string): void {
        this.cells[index].activateCell(idUser);
    }

    reconnectPlayer(idUser: string): void {
        this.cells.forEach((cell) => ('controlCompany' in cell) ? cell.sendInfoPlayer(idUser) : '');
    }

    playerBankrupt(idUser: string): void {
        this.cells.forEach((cell) =>
            ('owned' in cell && cell.owned === idUser)
                ? cell.owned = undefined
                : '');
    }

    calcCapitalCells(idUser: string): number {
        return this.cells.reduce((capital, cell) =>
            ('owned' in cell && cell.owned === idUser && !cell.pledge)
                ? capital + cell.infoCompany.collateralCompany + (cell.quantityStock * cell.infoCompany.priceStock)
                : capital
            , 0);
    }

    updateMonopoly(countryCompany: countryCompany): void {
        const cells = this.cells.filter((cell) =>
            'owned' in cell && cell.infoCompany.countryCompany === countryCompany) as CellCompanyI[];
        if (cells[0].infoCompany.countryCompany !== 'japan' && cells[0].infoCompany.countryCompany !== 'ukraine') {
            const ownedCell = cells.map((cell) => cell.owned ? cell.owned : 'noOwned');
            const result = [...new Set(ownedCell)].length;
            cells.forEach((cell) => cell.monopoly = (result === 1));
        } else {
            const ownedCell = cells.reduce((res, cell) => {
                if (cell.owned) {
                    res[cell.owned]
                        ? res[cell.owned].push(cell.index)
                        : res[cell.owned] = [cell.index]
                }
                return res;
            }, {});
            Object.values(ownedCell).forEach((indexs: number[]) =>
                indexs.forEach((index) => {
                    const cell = this.cells[index]
                    if ('quantityStock' in cell) cell.quantityStock = indexs.length;
                }));
        };
    }

}
