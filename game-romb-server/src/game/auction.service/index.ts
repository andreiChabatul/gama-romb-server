import { AuctionI, controlAuction, infoAuction, statePlayer } from "src/types";
import { AUCTION_STEP } from "src/const";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";
import { storage_players } from "../playerStorage";
import { CellCompanyI } from "src/types/cellsServices";

export class AuctionCompany implements AuctionI {

    cell: CellCompanyI;
    currentPrice: number;
    auctionWinner: string;
    indexActive: number;
    action: controlAuction;
    playersId: string[];

    constructor(private idRoom: string) { }

    startAuction(cell: CellCompanyI, idUser: string): void {
        this.playersId = [...storage_players.getPlayersActive(this.idRoom)];
        this.cell = cell;
        this.indexActive = 0;
        this.currentPrice = cell.infoCompany.priceCompany;
        this.action = 'startAuction';
        this.auctionWinner = '';
        this.filterParticipants(idUser);
        this.nextStep();
    }

    stepAuction(idUser: string): void {
        this.auctionWinner = idUser;
        this.currentPrice = Math.floor(this.currentPrice * AUCTION_STEP);
        this.filterParticipants();
        this.nextStep();
    }

    leaveAuction(idUser: string): void {
        this.filterParticipants(idUser);
        this.nextStep();
    }

    private filterParticipants(idUser?: string): void {
        const index = this.playersId.indexOf(idUser);
        this.playersId.splice(index, 1);
        this.playersId.map((id, index) =>
            (storage_players.getPlayer(this.idRoom, id).total < this.currentPrice) ? this.playersId.splice(index, 1) : '');
    }

    private nextStep(): void {
        ((this.playersId.length === 1 && this.auctionWinner) || this.playersId.length === 0)
            ? this.endAuction()
            : (this.indexActive > this.playersId.length - 2) ? 0 : this.indexActive += 1;
        this.sendAllPlayers();
    }

    private endAuction(): void {
        this.auctionWinner
            ? this.cell.buyCompany(storage_players.getPlayer(this.idRoom, this.auctionWinner), this.currentPrice)
            : '';
        this.action = 'endAuction';
    }

    private sendInfoPlayer(idUser: string, statePlayer: statePlayer): void {
        const payload: infoAuction = {
            indexCompany: this.cell.index,
            currentPrice: this.currentPrice,
            currentPlayer: this.auctionWinner ?? this.auctionWinner,
            action: this.action,
            statePlayer
        };
        storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.AUCTION, payload);
    }

    private sendAllPlayers(): void {
        storage_players.getPlayersActive(this.idRoom).map((idUser) => {
            let desc: statePlayer = this.playersId.includes(idUser) ? 'wait' : 'inactive';
            idUser === this.playersId[this.indexActive] ? desc = 'active' : '';
            this.sendInfoPlayer(idUser, desc);
        });
    }
}
