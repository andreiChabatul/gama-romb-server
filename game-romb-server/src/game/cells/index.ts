import { AuctionI, countryCompany } from "src/types"
import { defaultCell } from "./defaultCell";
import { CellEmpty } from "./cell.empty";
import { CellCompany } from "./cell.company";
import { CellTax } from "./cell.tax";
import { CellProfit } from "./cell.profit";
import { CellLoss } from "./cell.loss";
import { PrisonI } from "src/types/player";
import { CellsServiceI, cells } from "src/types/cellsServices";

export class CellsService implements CellsServiceI {

    cells: cells[];

    constructor(idRoom: string, auction: AuctionI, prison: PrisonI) {
        this.cells = defaultCell.map((cell, indexCell) => {
            switch (cell.type) {
                case "company":
                    return new CellCompany(indexCell, idRoom, cell.company, auction, this.updateMonopoly.bind(this));
                case "empty":
                    return new CellEmpty(indexCell, idRoom, cell.nameCell, prison);
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

    getAllCells(): cells[] {
        return this.cells;
    }

    getOneCell(index: number): cells {
        return this.cells[index];
    }

    activateCell(index: number): void {
        this.cells[index].activateCell();
    }

    reconnectPlayer(idUser: string): void {
        this.cells.forEach((cell) => ('controlCompany' in cell) ? cell.sendInfoPLayer(idUser) : '');
    }

    updateMonopoly(countryCompany: countryCompany): void {
        const cells = this.cells.filter((cell) =>
            'controlCompany' in cell && cell.infoCompany.countryCompany === countryCompany)


    }

}
