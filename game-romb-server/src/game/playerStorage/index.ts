import { PlayerDefaultI } from "src/types/player";
import { StoragePlayersI, storagePlayers } from "src/types/storagePlayers";

export class StoragePlayers implements StoragePlayersI {

    private storagePlayers: storagePlayers = {}

    addPlayer(idRoom: string, idUser: string, player: PlayerDefaultI): void {
        this.storagePlayers[idRoom] = {
            ...this.storagePlayers[idRoom],
            [idUser]: player
        };
    }

    getPlayersActive(idRoom: string): string[] {
        const playersActive = Object.fromEntries(
            Object.entries(this.storagePlayers[idRoom]).filter(([, value]) => !value.bankrupt));
        return Object.keys(playersActive);
    }

    getAmountPlayers(idRoom: string): number {
        return Object.keys(this.storagePlayers[idRoom]).length;
    }

    getPlayersRoom(idRoom: string): string[] {
        return Object.keys(this.storagePlayers[idRoom]);
    }

    getPlayer(idRoom: string, idUser: string): PlayerDefaultI {
        return this.storagePlayers[idRoom][idUser];
    }

    deletePlayer(idRoom: string, idUser: string): void {
        delete this.storagePlayers[idRoom][idUser];
    }

    deleteRoom(idRoom: string): void {
        delete this.storagePlayers[idRoom];
    }

}

export const storage_players = new StoragePlayers();
