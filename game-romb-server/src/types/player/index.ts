import { cells, prisonPlayer } from "..";
import { EMESSAGE_CLIENT } from "../chat";

export interface PlayerDefaultI {
    _total: number;
    _bankrupt: boolean;
    _prison: prisonPlayer;
    _isOnline: boolean;
    cellPosition: number;
    get position(): number;
    get total(): number;
    set position(value: number);
    get userId(): string;
    set addTotal(value: number);
    minusTotal(value: number, action?: EMESSAGE_CLIENT, cellId?: number): void;
    get prison(): boolean;
    set prison(value: boolean);
    set attemptPrison(value: number);
    get attemptPrison(): number;
    get capital(): number;
    set bankrupt(value: boolean);
    get bankrupt(): boolean;
    set online(value: boolean);
    updatePlayer(idUser?: string): void;
    get playerInfo(): updatePlayer;
}

export interface PrisonI {
    addPrisoner(player: PlayerDefaultI): void;
    deletePrisoner(player: PlayerDefaultI): void;
    turnPrison(player: PlayerDefaultI): void;
    payDebt(player: PlayerDefaultI): void;
}

export type updatePlayer = {
    id: string;
    total: number;
    capital: number;
    color: string;
    cellPosition: number;
    prison: prisonPlayer;
    bankrupt: boolean;
    online: boolean;
}