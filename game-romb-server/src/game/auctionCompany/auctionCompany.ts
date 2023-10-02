import { CellCompanyI, CompanyInfo, PlayerDefaultI, PlayersGame, infoCellTurn, language } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { AUCTION_DESCRIPTION } from "./auction.description";
import { changeMessage } from "../services/change.message";
import { AUCTION_STEP } from "src/app/const";
import { TurnService } from "../turn.service/turn.service";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class AuctionCompany {

    cell: CellCompanyI;
    language: language = 'ru';
    priceAuction: number;
    private auctionWinner: string;
    companyInfo: CompanyInfo;
    inactivePlayers: string[] = [];
    activePlayers: string[] = [];
    indexActive: number;

    constructor(
        private players: PlayersGame,
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService) { }

    startAuction(cell: CellCompanyI, idUser: string): void {
        this.cell = cell;
        this.indexActive = 0;
        this.companyInfo = this.cell.info;
        this.priceAuction = this.companyInfo.priceCompany;
        this.chat.addMessage(changeMessage(
            AUCTION_DESCRIPTION[this.language].auctionStart, this.companyInfo
        ));
        this.inactivePlayers.push(idUser);
        this.nextBind();
    }

    stepAuction(player: PlayerDefaultI): void {
        this.auctionWinner = player.userId;
        this.priceAuction = Math.floor(this.priceAuction * AUCTION_STEP);
        this.chat.addMessage(changeMessage(
            AUCTION_DESCRIPTION[this.language].auctionStep + this.priceAuction,
            this.companyInfo,
            player
        ))
        this.nextBind();
    }

    leaveAuction(player: PlayerDefaultI): void {
        this.chat.addMessage(changeMessage(
            AUCTION_DESCRIPTION[this.language].auctionLeave,
            null,
            player
        ));
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
                if (this.players[key].total < (this.priceAuction * AUCTION_STEP)) {
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
            description: changeMessage(AUCTION_DESCRIPTION[this.language].auctionCanceling),
        }
    }

    private sendWaitingPLayer(): infoCellTurn {
        return {
            ...this.sendActivePLayer(),
            buttons: 'none',
            description: changeMessage(AUCTION_DESCRIPTION[this.language].auctionWainting),
        }
    }

    private sendActivePLayer(): infoCellTurn {
        return {
            nameCell: this.companyInfo.nameCompany,
            titleCell: changeMessage(AUCTION_DESCRIPTION[this.language].auctionTitle, this.companyInfo),
            indexCompany: this.cell.index,
            buttons: 'auction',
            description: changeMessage(AUCTION_DESCRIPTION[this.language].auctionDescBuyer + this.priceAuction),
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
        this.auctionWinner ? this.cell.buyCompany(this.players[this.auctionWinner], this.priceAuction) : '';
        this.roomWS.sendAllPlayers(EACTION_WEBSOCKET.INFO_CELL_TURN,
            {
                ...this.sendWaitingPLayer(),
                titleCell: changeMessage(AUCTION_DESCRIPTION[this.language].auctionFinish, this.companyInfo),
                description:
                    changeMessage(AUCTION_DESCRIPTION[this.language].auctionFinishDesc
                        + `${this.auctionWinner ? this.players[this.auctionWinner].name : 'No'}`),
            });
        ;

        setTimeout(() => { this.turnService.endTurn() }, 1000);
    }
}
