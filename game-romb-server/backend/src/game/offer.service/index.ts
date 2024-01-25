import { OfferServiceI, offerDealInfo, offerInfo } from 'src/types';
import { EACTION_WEBSOCKET } from 'src/types/websocket';
import { storage_WS } from '../socketStorage';
import { CellsServiceI } from 'src/types/cellsServices';
import { storage_players } from '../playerStorage';

export class OfferService implements OfferServiceI {
  offerDealInfo: offerDealInfo;

  constructor(private idRoom: string, private cellsService: CellsServiceI) {}

  newOffer(offerDealInfo: offerDealInfo): void {
    this.offerDealInfo = offerDealInfo;
    storage_WS.sendOnePlayerGame(
      this.idRoom,
      offerDealInfo.receivePerson.idPerson,
      EACTION_WEBSOCKET.CONTROL_DEAL,
      this.offerDealInfo,
    );
  }

  acceptDeal(): void {
    const { offerPerson, receivePerson } = this.offerDealInfo;
    const offerPlayer = storage_players.getPlayer(
      this.idRoom,
      offerPerson.idPerson,
    );
    const receivePlayer = storage_players.getPlayer(
      this.idRoom,
      receivePerson.idPerson,
    );

    offerPlayer.minusTotal(offerPerson.valueMoney);
    offerPlayer.addTotal(receivePerson.valueMoney);
    receivePlayer.minusTotal(receivePerson.valueMoney);
    receivePlayer.addTotal(offerPerson.valueMoney);
    changeCompany.bind(this)(offerPerson, receivePerson);
    changeCompany.bind(this)(receivePerson, offerPerson);

    function changeCompany(personOne: offerInfo, personTwo: offerInfo): void {
      personOne.indexCompany.map((index) => {
        const cell = this.cellsService.getOneCell(index);
        if ('owned' in cell) cell.owned = personTwo.idPerson;
      });
    }
  }
}
