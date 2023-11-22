import { CellCompanyI, PlayerDefaultI, PlayersGame, controlAuction, infoAuction, infoCellTurn } from "src/types";
import { Chat } from "../chatGame";
import { AUCTION_STEP } from "src/app/const";
import { TurnService } from "../turn.service";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class AuctionCompany {

    cell: CellCompanyI;
    currentPrice: number;
    auctionWinner: string;
    inactivePlayers: string[] = [];
    activePlayers: string[] = [];
    indexActive: number;
    action: controlAuction;

    constructor(
        private players: PlayersGame,
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService) { }

    startAuction(cell: CellCompanyI, idUser: string): void {
        this.cell = cell;
        this.indexActive = 0;
        this.currentPrice = cell.infoCompany.priceCompany;
        this.action = 'startAuction';
        // this.chat.addMessage(changeMessage(
        //     AUCTION_DESCRIPTION[this.language].auctionStart, this.companyInfo
        // ));
        this.inactivePlayers.push(idUser);
        this.sendInfoPlayer();
        // this.nextBind();
    }

    stepAuction(player: PlayerDefaultI): void {
        this.auctionWinner = player.userId;
        this.currentPrice = Math.floor(this.currentPrice * AUCTION_STEP);
        // this.chat.addMessage(changeMessage(
        //     AUCTION_DESCRIPTION[this.language].auctionStep + this.priceAuction,
        //     this.companyInfo,
        //     player
        // ))
        // this.nextBind();
        this.sendInfoPlayer();
    }

    leaveAuction(player: PlayerDefaultI): void {
        // this.chat.addMessage(changeMessage(
        //     AUCTION_DESCRIPTION[this.language].auctionLeave,
        //     null,
        //     player
        // ));
        this.inactivePlayers.push(player.userId);
        this.nextBind();
    }

    private sendAuctionInfo(): void {
        this.filterPlayers();
        this.activePlayers.forEach((userId, index) => {
            const payload = (index === this.indexActive) ? this.sendActivePLayer() : this.sendWaitingPLayer();
            this.roomWS.sendOnePlayer(userId, EACTION_WEBSOCKET.INFO_CELL_TURN, payload);

        }); //отправка сообщения активным участникам аукциона

        this.inactivePlayers.forEach((userId) => {
            this.roomWS.sendOnePlayer(userId, EACTION_WEBSOCKET.INFO_CELL_TURN, this.sendInactivePLayer())
        }); //отправка сообщения неактивным участникам аукциона
    }

    private filterPlayers(): void {
        this.activePlayers = [];
        Object.keys(this.players).map((key) => {
            if (!this.inactivePlayers.includes(key)) {
                if (this.players[key].total < (this.currentPrice * AUCTION_STEP)) {
                    this.inactivePlayers.push(key);
                }
            }
        });

        Object.keys(this.players).map((key) =>
            (!this.inactivePlayers.includes(key)) ? this.activePlayers.push(key) : ''
        )
    }

    private sendInactivePLayer(): infoCellTurn {
        return {
            ...this.sendWaitingPLayer(),

        }
    }

    private sendWaitingPLayer(): infoCellTurn {
        return {
            ...this.sendActivePLayer(),
            buttons: 'none',

        }
    }

    private sendActivePLayer(): infoCellTurn {
        return {
            indexCompany: this.cell.index,
            buttons: 'none',
            description: ''

        }
    }

    private nextBind(): void {
        this.filterPlayers();
        if ((this.activePlayers.length === 1 && this.auctionWinner) || this.activePlayers.length === 0) {
            this.endAuction();
        } else {
            this.indexActive > this.activePlayers.length - 2 ? this.indexActive = 0 : this.indexActive += 1;
            this.sendAuctionInfo();
        };
    }

    private endAuction(): void {
        this.auctionWinner ? this.cell.buyCompany(this.players[this.auctionWinner], this.currentPrice) : '';
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INFO_CELL_TURN,
            {
                // ...this.sendWaitingPLayer(),
                // titleCell: changeMessage(AUCTION_DESCRIPTION[this.language].auctionFinish, this.companyInfo),
                // description:
                //     changeMessage(AUCTION_DESCRIPTION[this.language].auctionFinishDesc
                //         + `${this.auctionWinner ? this.players[this.auctionWinner].name : 'No'}`),
            });
        ;

        setTimeout(() => { this.turnService.endTurn() }, 1000);
        this.activePlayers = [];
        this.inactivePlayers = [];
        this.auctionWinner = '';
    }

    sendInfoPlayer(): void {
        const payload: infoAuction = {
            indexCompany: this.cell.index,
            currentPrice: this.currentPrice,
            currentPlayer: this.auctionWinner ? this.auctionWinner : '',
            action: this.action
        };

        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.AUCTION, payload);
    }
}
