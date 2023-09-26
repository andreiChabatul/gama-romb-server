import { CellCompanyI, CompanyInfo, EACTION_WEBSOCKET, PlayersGame, infoCellTurn, language } from "src/types";
import { Chat } from "../chatGame/chat.room";
import { AUCTION_DESCRIPTION } from "./auction.description";
import { changeMessage } from "../services/change.message";
import { AUCTION_STEP } from "src/app/const";

export class AuctionCompany {

    cell: CellCompanyI;
    chat: Chat;
    players: PlayersGame;
    language: language = 'ru';
    priceAuction: number;
    private auctionWinner: string;
    companyInfo: CompanyInfo;
    inactivePlayers: string[] = [];
    activePlayers: string[] = [];
    indexActive: number;

    constructor(chat: Chat, players: PlayersGame) {
        this.chat = chat;
        this.players = players;
    }

    startAuction(cell: CellCompanyI, idUser: string): void {
        this.cell = cell;
        this.indexActive = 0;
        this.companyInfo = this.cell.getCompanyInfo();
        this.priceAuction = this.companyInfo.priceCompany;
        this.chat.addMessage(changeMessage(
            AUCTION_DESCRIPTION[this.language].auctionStart, this.companyInfo
        ));
        this.inactivePlayers.push(idUser);
        this.nextBind();
    }

    stepAuction(idUser: string): void {
        this.auctionWinner = idUser;
        this.priceAuction = Math.floor(this.priceAuction * AUCTION_STEP);
        this.chat.addMessage(changeMessage(
            AUCTION_DESCRIPTION[this.language].auctionStep + this.priceAuction,
            this.companyInfo,
            this.players[idUser]
        ))
        this.nextBind();
    }

    leaveAuction(idUser: string): void {
        this.chat.addMessage(changeMessage(
            AUCTION_DESCRIPTION[this.language].auctionLeave,
            null,
            this.players[idUser]
        ));
        this.inactivePlayers.push(idUser);
        this.nextBind();
    }

    private sendAuctionInfo(): void {
        this.filterPlayers();
        this.activePlayers.map((key, index) => {
            const payload = (index === this.indexActive) ? this.sendActivePLayer() : this.sendWaitingPLayer();
            this.players[key].getWebSocket().send(JSON.stringify(
                {
                    action: EACTION_WEBSOCKET.INFO_CELL_TURN,
                    payload
                }))
        }); //отправка сообщения активным участникам аукциона


        this.inactivePlayers.map((key) => {
            this.players[key].getWebSocket().send(JSON.stringify(
                {
                    action: EACTION_WEBSOCKET.INFO_CELL_TURN,
                    payload: this.sendInactivePLayer()
                }))
        }); //отправка сообщения неактивным участникам аукциона
    }

    private filterPlayers(): void {
        this.activePlayers = [];
        Object.keys(this.players).map((key) => {
            if (!this.inactivePlayers.includes(key)) {
                if (this.players[key].getTotalPlayer() < (this.priceAuction * AUCTION_STEP)) {
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
            indexCompany: this.cell.getIndexCompany(),
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
        Object.keys(this.players).map((key) => {
            this.players[key].getWebSocket().send(JSON.stringify(
                {
                    action: EACTION_WEBSOCKET.INFO_CELL_TURN,
                    payload: {
                        ...this.sendWaitingPLayer(),
                        titleCell: changeMessage(AUCTION_DESCRIPTION[this.language].auctionFinish, this.companyInfo),
                        description:
                            changeMessage(AUCTION_DESCRIPTION[this.language].auctionFinishDesc
                                + `${this.auctionWinner ? this.players[this.auctionWinner].getNamePlayer() : 'No'}`),
                    }
                }))
        })
    }
}
