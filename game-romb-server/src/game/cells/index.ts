import { AuctionI, PrisonI, cells, playersGame } from "src/types"
import { defaultCell } from "./defaultCell";
import { CellEmpty } from "./cell.empty";
import { CellCompany } from "./cell.company";
import { CellTax } from "./cell.tax";
import { CellProfit } from "./cell.profit";
import { CellLoss } from "./cell.loss";
import { Room_WS } from "src/types/websocket";

export const cellsGame = (roomWS: Room_WS, auction: AuctionI, players: playersGame, prison: PrisonI): cells[] => {
    return defaultCell.map((cell, indexCell) => {
        switch (cell.type) {
            case "company":
                return new CellCompany(indexCell, roomWS, cell.company, auction, players);
            case "empty":
                return new CellEmpty(indexCell, roomWS, cell.nameCell, prison);
            case "tax":
                return new CellTax(indexCell, roomWS, cell.nameCell);
            case "profit":
                return new CellProfit(indexCell, roomWS);
            case "loss":
                return new CellLoss(indexCell, roomWS);
            default:
                break;
        }
    });
}