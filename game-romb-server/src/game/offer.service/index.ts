import { OfferServiceI, playersGame, cells, offerDealInfo, offerInfo } from "src/types";
import { EACTION_WEBSOCKET, Room_WS } from "src/types/websocket";

export class OfferService implements OfferServiceI {

    offerDealInfo: offerDealInfo;

    constructor(private players: playersGame, private roomWS: Room_WS, private cellsGame: cells[]) { }

    newOffer(offerDealInfo: offerDealInfo): void {
        this.offerDealInfo = offerDealInfo;
        this.roomWS.sendOnePlayer(offerDealInfo.receivePerson.idPerson,
            EACTION_WEBSOCKET.CONTROL_DEAL,
            this.offerDealInfo
        );
    }

    acceptDeal(): void {

        const { offerPerson, receivePerson } = this.offerDealInfo;

        this.players[offerPerson.idPerson].minusTotal(offerPerson.valueMoney);
        this.players[offerPerson.idPerson].addTotal = receivePerson.valueMoney;
        this.players[receivePerson.idPerson].minusTotal(receivePerson.valueMoney);
        this.players[receivePerson.idPerson].addTotal = offerPerson.valueMoney;
        changeCompany.bind(this)(offerPerson, receivePerson);
        changeCompany.bind(this)(receivePerson, offerPerson);

        function changeCompany(personOne: offerInfo, personTwo: offerInfo): void {
            personOne.indexCompany.map((index) => {
                const cell = this.cellsGame[index];
                ('owned' in cell)
                    ? cell.owned = personTwo.idPerson
                    : '';
            }
            );
        };
    }
}
