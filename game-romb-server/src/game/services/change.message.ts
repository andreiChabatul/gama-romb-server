import { CompanyInfo, PlayerDefaultI } from "src/types";

export function changeMessage(message: string, cellInfo?: CompanyInfo, player?: PlayerDefaultI, value?: number): string {
    let result = message;;

    result = (cellInfo)
        ? result.replaceAll('COMPANY', cellInfo.nameCompany.toUpperCase())
            .replaceAll('PRICE', String(cellInfo.priceCompany))
        : result;

    result = (player)
        ? result.replaceAll('PLAYER', player.name)
        : result;

    result = (value)
        ? result.replaceAll('VALUE', String(value))
        : result
    return result;
}