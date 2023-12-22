import { PlayerDefaultI } from "../player";

export interface StoragePlayersI {
    addPlayer(idRoom: string, idUser: string, player: PlayerDefaultI): void;
    getPlayer(idRoom: string, idUser: string): PlayerDefaultI;
    deletePlayer(idRoom: string, idUser: string): void;
    deleteRoom(idRoom: string): void;
    getPlayersActive(idRoom: string): string[];
    getAmountPlayers(idRoom: string): number;
    getPlayersRoom(idRoom: string): string[];
}


export type storagePlayers = {
    [idRoom: string]: roomPlayers,
};

type roomPlayers = {
    [idUser: string]: PlayerDefaultI
};