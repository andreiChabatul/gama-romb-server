import { CompanyInfo, PlayerDefaultI } from "src/types";

export function changeMessage(message: string, cellInfo?: CompanyInfo, player?: PlayerDefaultI): string {
    let result = message;
    result = cellInfo
        ? message.replaceAll('COMPANY', cellInfo.nameCompany.toUpperCase())
            .replaceAll('PRICE', String(cellInfo.priceCompany))
        : result;
    result = player
        ? message.replaceAll('PLAYER', player.name)
        : result;
    return result;
}