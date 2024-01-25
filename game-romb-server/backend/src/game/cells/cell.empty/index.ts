import { storage_players } from 'src/game/playerStorage';
import { prison } from 'src/game/prison.service';
import { storage_WS } from 'src/game/socketStorage';
import { infoCellTurn } from 'src/types';
import { CellDefault } from 'src/types/cellsServices';
import { EACTION_WEBSOCKET } from 'src/types/websocket';

export class CellEmpty implements CellDefault {
  constructor(
    private _index: number,
    private _idRoom: string,
    private _nameCell: string,
  ) {}

  movePlayer(idUser: string): void {
    this.sendInfoPlayer(idUser);
  }

  get index(): number {
    return this._index;
  }

  sendInfoPlayer(idUser: string): void {
    const payload: infoCellTurn = {
      indexCompany: this._index,
      description: this._nameCell + 'Desc',
      buttons: 'none',
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
    if (this._nameCell === 'goJail') prison.addPrisoner(this._idRoom, idUser);
    if (player && player.prison && this._nameCell === 'inJail')
      prison.payDebt(this._idRoom, idUser);
  }
}
