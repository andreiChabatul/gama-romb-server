import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map, mergeMap } from 'rxjs';
import { gameCell } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectGameRoom, selectModal } from 'src/store/selectors';

@Component({
  selector: 'app-modal-info-cell',
  templateUrl: './modal-info-cell.component.html',
  styleUrls: ['./modal-info-cell.component.scss']
})
export class ModalInfoCellComponent {

  modal$ = this.store.select(selectModal);
  gameRoom$ = this.store.select(selectGameRoom);

  constructor(private store: Store<AppStore>) { }

  get gameCell(): Observable<gameCell> {
    return this.modal$.pipe(
      mergeMap((modal) => this.gameRoom$.pipe(
        map(gameRoom => gameRoom.board[Number(modal.payload)])
      ))
    );
  }

}
