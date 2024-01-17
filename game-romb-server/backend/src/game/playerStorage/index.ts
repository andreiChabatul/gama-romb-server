import { PlayerDefaultI } from "src/types/player";
import { StoragePlayersI, storagePlayers } from "src/types/storagePlayers";
import { storage_WS } from "../socketStorage";

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

    getPlayersRoom(idRoom: string): string[] {
        return this.storagePlayers[idRoom] ? Object.keys(this.storagePlayers[idRoom]) : [];
    }

    getPlayer(idRoom: string, idUser: string): PlayerDefaultI {
        return this.storagePlayers[idRoom][idUser];
    }

    deletePlayer(idRoom: string, idUser: string): void {
        delete this.storagePlayers[idRoom][idUser];
        storage_WS.leavePlayerGame(idRoom, idUser);
    }

    deleteRoom(idRoom: string): void {
        delete this.storagePlayers[idRoom];
    }

    searchActiveRoom(idUser: string): string | undefined {
        let result: string | undefined;
        Object.keys(this.storagePlayers).forEach((idRoom) => {
            const idUsers = Object.keys(this.storagePlayers[idRoom]).filter((element) => element === idUser);
            idUsers.length > 0 ? result = idRoom : '';
        })
        return result;
    }

}

export const storage_players = new StoragePlayers();
