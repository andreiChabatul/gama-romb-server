import { CompanyInfo, PlayerDefaultI } from "src/types";

export function changeMessage(message: string, cellInfo?: CompanyInfo, player?: PlayerDefaultI, value?: number): string {
    let result = message;;



    result = (player)
        ? result.replaceAll('PLAYER', player.name)
        : result;

    result = (value)
        ? result.replaceAll('VALUE', String(value))
        : result
    return result;
}