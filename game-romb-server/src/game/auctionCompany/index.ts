import { AuctionI, CellCompanyI, PlayersGame, controlAuction, descAuction, infoAuction } from "src/types";
import { Chat } from "../chatGame";
import { AUCTION_STEP } from "src/app/const";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class AuctionCompany implements AuctionI {

    cell: CellCompanyI;
    currentPrice: number;
    auctionWinner: string;
    indexActive: number;
    action: controlAuction;
    playersId: string[];

    constructor(private players: PlayersGame, private roomWS: Room_WS, private chat: Chat) { }

    startAuction(cell: CellCompanyI, idUser: string): void {
        this.playersId = Object.keys(this.players);
        this.cell = cell;
        this.indexActive = 0;
        this.currentPrice = cell.infoCompany.priceCompany;
        this.action = 'startAuction';
        this.auctionWinner = '';
        // this.chat.addMessage(changeMessage(
        //     AUCTION_DESCRIPTION[this.language].auctionStart, this.companyInfo
        // ));
        this.filterParticipants(idUser);
        this.nextStep();
    }

    stepAuction(idUser: string): void {
        this.auctionWinner = idUser;
        this.currentPrice = Math.floor(this.currentPrice * AUCTION_STEP);
        this.filterParticipants();
        // this.chat.addMessage(changeMessage(
        //     AUCTION_DESCRIPTION[this.language].auctionStep + this.priceAuction,
        //     this.companyInfo,
        //     player
        // ))
        this.nextStep();
    }

    filterParticipants(idUser?: string): void {
        const index = this.playersId.indexOf(idUser);
        this.playersId.splice(index, 1);
        this.playersId.map((id, index) =>
            (this.players[id].total < this.currentPrice) ? this.playersId.splice(index, 1) : '');
    }

    leaveAuction(idUser: string): void {
        // this.chat.addMessage(changeMessage(
        //     AUCTION_DESCRIPTION[this.language].auctionLeave,
        //     null,
        //     player
        // ));
        this.filterParticipants(idUser);
        this.nextStep();
    }

    private nextStep(): void {
        if ((this.playersId.length === 1 && this.auctionWinner) || this.playersId.length === 0) {
            this.endAuction();
        } else {
            (this.indexActive > this.playersId.length - 2) ? 0 : this.indexActive += 1;
        }
        this.sendAllPlayers();
    }

    private endAuction(): void {
        this.auctionWinner ? this.cell.buyCompany(this.players[this.auctionWinner], this.currentPrice) : '';
        this.action = 'endAuction'
    }

    sendInfoPlayer(idUser: string, description: descAuction): void {
        const payload: infoAuction = {
            indexCompany: this.cell.index,
            currentPrice: this.currentPrice,
            currentPlayer: this.auctionWinner ? this.players[this.auctionWinner].name : '',
            action: this.action,
            description
        };
        this.roomWS.sendOnePlayer(idUser, EACTION_WEBSOCKET.AUCTION, payload);
    }

    sendAllPlayers(): void {
        Object.values(this.players).map((player) => {
            if (!player.bankrupt) {
                let desc: descAuction = this.playersId.includes(player.userId) ? 'wait' : 'inactive';
                player.userId === this.playersId[this.indexActive] ? desc = 'active' : '';
                this.sendInfoPlayer(player.userId, desc);
            }
        })
    }

}
