import { AuctionI, CellCompanyI, playersGame, controlAuction, infoAuction, statePlayer } from "src/types";
import { AUCTION_STEP } from "src/const";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";

export class AuctionCompany implements AuctionI {

    cell: CellCompanyI;
    currentPrice: number;
    auctionWinner: string;
    indexActive: number;
    action: controlAuction;
    playersId: string[];

    constructor(private idRoom: string, private players: playersGame) { }

    startAuction(cell: CellCompanyI, idUser: string): void {
        this.playersId = Object.keys(this.players);
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
            (this.players[id].total < this.currentPrice) ? this.playersId.splice(index, 1) : '');
    }

    private nextStep(): void {
        ((this.playersId.length === 1 && this.auctionWinner) || this.playersId.length === 0)
            ? this.endAuction()
            : (this.indexActive > this.playersId.length - 2) ? 0 : this.indexActive += 1;
        this.sendAllPlayers();
    }

    private endAuction(): void {
        this.auctionWinner ? this.cell.buyCompany(this.players[this.auctionWinner], this.currentPrice) : '';
        this.action = 'endAuction'
    }

    private sendInfoPlayer(idUser: string, statePlayer: statePlayer): void {
        const payload: infoAuction = {
            indexCompany: this.cell.index,
            currentPrice: this.currentPrice,
            currentPlayer: this.auctionWinner ? this.players[this.auctionWinner].userId : '',
            action: this.action,
            statePlayer
        };
        storage_WS.sendOnePlayerGame(this.idRoom, idUser, EACTION_WEBSOCKET.AUCTION, payload);
    }

    private sendAllPlayers(): void {
        Object.values(this.players).map((player) => {
            if (!player.bankrupt) {
                let desc: statePlayer = this.playersId.includes(player.userId) ? 'wait' : 'inactive';
                player.userId === this.playersId[this.indexActive] ? desc = 'active' : '';
                this.sendInfoPlayer(player.userId, desc);
            }
        });
    }

}
