import { INIT_TOTAL } from "src/const";
import { prisonPlayer } from "src/types";

export const emptyPlayer = {
    total: INIT_TOTAL,
    capital: INIT_TOTAL,
    cellPosition: 0,
    prison: {} as prisonPlayer,
    bankrupt: false,
    online: true,
}