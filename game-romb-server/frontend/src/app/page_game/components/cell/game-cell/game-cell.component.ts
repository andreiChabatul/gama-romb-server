import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fullPlayer, gameCell } from 'src/app/types';
import { AppStore, controlCompany } from 'src/app/types/state';
import { OpenModal } from 'src/store/actions/modalActions';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent {

  @Input() gameCell: gameCell;
  @Input() controlCompany: controlCompany;
  @Input() gamePlayer: fullPlayer;

  constructor(private store: Store<AppStore>) { }

  clickCellInfo() {
    this.store.dispatch(OpenModal({ payload: { modalState: 'infoCell', payload: this.gameCell.indexCell } }));
  }

}
