import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { gameCell } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { OpenModal } from 'src/store/actions/modalActions';

@Component({
  selector: 'app-game-cell',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.scss']
})
export class GameCellComponent {

  @Input() gameCell: gameCell;

  constructor(private store: Store<AppStore>) { }

  clickCellInfo() {
    this.store.dispatch(OpenModal({ payload: { modalState: 'infoCell', payload: this.gameCell.indexCell } }));
  }

}
