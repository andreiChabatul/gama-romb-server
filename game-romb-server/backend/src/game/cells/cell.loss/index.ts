import { VALUE_CELL } from 'src/const';
import { storage_players } from 'src/game/playerStorage';
import { storage_WS } from 'src/game/socketStorage';
import { infoCellTurn } from 'src/types';
import { CellDefault } from 'src/types/cellsServices';
import { EMESSAGE_CLIENT } from 'src/types/chat';
import { EACTION_WEBSOCKET } from 'src/types/websocket';
import { PlayerDefaultI } from 'src/types/player';

export class CellLoss implements CellDefault {
  _cellValue: number;
  _randomIndex: number;
  player: PlayerDefaultI;

  constructor(private _index: number, private _idRoom: string) {}

  movePlayer(idUser: string): void {
    this.player = storage_players.getPlayer(this._idRoom, idUser);
    this._randomIndex = Math.floor(Math.random() * VALUE_CELL.length);
    this._cellValue = VALUE_CELL[this._randomIndex];
    this.player.bankrupt = this._cellValue >= this.player.capital;
    this.sendInfoPlayer(idUser);
  }

  get index(): number {
    return this._index;
  }

  sendInfoPlayer(idUser: string): void {
    const payload: infoCellTurn = {
      indexCompany: this._index,
      description: 'descloss' + this._randomIndex,
      buttons: this.player.bankrupt ? 'bankrupt' : 'pay',
      value: this._cellValue,
    };
    storage_WS.sendOnePlayerGame(
      this._idRoom,
      idUser,
      EACTION_WEBSOCKET.INFO_CELL_TURN,
      payload,
    );
  }

  activateCell(idUser: string): void {
    const player = storage_players.getPlayer(this._idRoom, idUser);
    player.minusTotal(this._cellValue, EMESSAGE_CLIENT.MINUS_TOTAL_PAY_DEBT);
  }
}
