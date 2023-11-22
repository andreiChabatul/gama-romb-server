import { PlayersGame, cells, offerDealInfo, offerInfo } from "src/types";
import { EACTION_WEBSOCKET, OfferDealPayload, Room_WS } from "src/types/websocket";
import { Chat } from "../chatGame";
import { EMESSAGE_CLIENT } from "src/app/const/enum";
import { TurnService } from "../turn.service";

export class OfferService {

    offerDealInfo: offerDealInfo;

    constructor(
        private players: PlayersGame,
        private roomWS: Room_WS,
        private chat: Chat,
        private turnService: TurnService,
        private cellsGame: cells[]
    ) { }

    private newOffer(offerDealInfo: offerDealInfo): void {
        this.offerDealInfo = offerDealInfo;
        this.roomWS.sendOnePlayer(this.offerDealInfo.receivePerson.idPerson,
            EACTION_WEBSOCKET.CONTROL_DEAL,
            this.offerDealInfo
        );
    }

    private acceptDeal(): void {
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.ACCEPT_DEAL, playerId: this.offerDealInfo.receivePerson.idPerson });

        const offerPerson = this.offerDealInfo.offerPerson;
        const receivePerson = this.offerDealInfo.receivePerson;

        this.players[offerPerson.idPerson].minusTotal(offerPerson.valueMoney);
        this.players[offerPerson.idPerson].addTotal = receivePerson.valueMoney;
        this.players[receivePerson.idPerson].minusTotal(receivePerson.valueMoney);
        this.players[receivePerson.idPerson].addTotal = offerPerson.valueMoney;
        changeCompany(offerPerson, receivePerson, this.cellsGame);
        changeCompany(receivePerson, offerPerson, this.cellsGame);

        function changeCompany(personOne, personTwo: offerInfo, cellsGame: cells[]): void {
            personOne.indexCompany.map((index) => {
                const cell = cellsGame[index];
                ('owned' in cell)
                    ? cell.owned = this.players[personTwo.idPerson]
                    : ''
            }
            );
        }
        this.closeDeal();
    }

    private refuseDeal(): void {
        this.chat.addSystemMessage({ action: EMESSAGE_CLIENT.REFUSE_DEAL, playerId: this.offerDealInfo.receivePerson.idPerson })
        this.closeDeal();
    }

    private closeDeal(): void {
        this.turnService.updateTurn();
        this.offerDealInfo = {};
    }

    controlDeal(offerDealPayload: OfferDealPayload): void {
        switch (offerDealPayload.action) {
            case 'offer':
                this.newOffer(offerDealPayload.offerDealInfo);
                break;
            case "refuse":
                this.refuseDeal();
                break;
            case "accept":
                this.acceptDeal();
                break;
            default:
                break;
        }
    }

}
