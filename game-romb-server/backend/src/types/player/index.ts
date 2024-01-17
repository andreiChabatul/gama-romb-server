import { EMESSAGE_CLIENT } from "../chat";

export interface PlayerDefaultI {
    _total: number;
    _bankrupt: boolean;
    _prison: number;
    _isOnline: boolean;
    cellPosition: number;
    get position(): number;
    get total(): number;
    set total(value: number);
    set position(value: number);
    get userId(): string;
    addTotal(value: number): void;
    minusTotal(value: number, action?: EMESSAGE_CLIENT, cellId?: number): void;
    get prison(): number;
    set prison(value: number);
    get capital(): number;
    set bankrupt(value: boolean);
    get bankrupt(): boolean;
    set online(value: boolean);
    updatePlayer(idUser?: string): void;
    get playerInfo(): updatePlayer;
    get turn(): boolean;
    set turn(value: boolean);
}

export type updatePlayer = {
    id: string;
    total: number;
    capital: number;
    color: string;
    cellPosition: number;
    prison: number;
    bankrupt: boolean;
    online: boolean;
}