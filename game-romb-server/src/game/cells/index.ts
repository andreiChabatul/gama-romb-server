import { AuctionI, cells, playersGame } from "src/types"
import { defaultCell } from "./defaultCell";
import { CellEmpty } from "./cell.empty";
import { CellCompany } from "./cell.company";
import { CellTax } from "./cell.tax";
import { CellProfit } from "./cell.profit";
import { CellLoss } from "./cell.loss";
import { PrisonI } from "src/types/player";

export const cellsGame = (idRoom: string, auction: AuctionI, players: playersGame, prison: PrisonI): cells[] => {
    return defaultCell.map((cell, indexCell) => {
        switch (cell.type) {
            case "company":
                return new CellCompany(indexCell, idRoom, cell.company, auction, players);
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