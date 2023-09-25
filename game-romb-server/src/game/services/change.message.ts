import { CompanyInfo } from "src/types";
import { PlayerDefault } from "../player";

export function changeMessage(message: string, cellInfo?: CompanyInfo, player?: PlayerDefault): string {
    let result = message;
    result = cellInfo
        ? message.replaceAll('COMPANY', cellInfo.nameCompany.toUpperCase())
            .replaceAll('PRICE', String(cellInfo.priceCompany))
        : result;
    result = player
        ? message.replaceAll('PLAYER', player.getNamePlayer())
        : result;
    return result;
}