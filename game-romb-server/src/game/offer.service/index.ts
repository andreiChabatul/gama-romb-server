import { OfferServiceI, playersGame, cells, offerDealInfo, offerInfo } from "src/types";
import { EACTION_WEBSOCKET } from "src/types/websocket";
import { storage_WS } from "../socketStorage";

export class OfferService implements OfferServiceI {

    offerDealInfo: offerDealInfo;

    constructor(private idRoom: string, private players: playersGame, private cellsGame: cells[]) { }

    newOffer(offerDealInfo: offerDealInfo): void {
        this.offerDealInfo = offerDealInfo;
        storage_WS.sendOnePlayerGame(this.idRoom, offerDealInfo.receivePerson.idPerson,
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
