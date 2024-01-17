import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, map, mapTo, mergeMap } from 'rxjs';
import { gameCell } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectGameRoom, selectModal } from 'src/store/selectors';

@Component({
  selector: 'app-modal-info-cell',
  templateUrl: './modal-info-cell.component.html',
  styleUrls: ['./modal-info-cell.component.scss']
})
export class ModalInfoCellComponent implements OnInit, OnDestroy {

  subscription$: Subscription;
  modal$ = this.store.select(selectModal);
  gameRoom$ = this.store.select(selectGameRoom);
  gameCell: gameCell;

  constructor(private store: Store<AppStore>) { }

  ngOnInit(): void {

    this.subscription$ = this.modal$.pipe(
      mergeMap((modal) => this.gameRoom$.pipe(
        map(gameRoom => { return { modal, gameRoom } })
      ))
    ).subscribe((value) => this.gameCell = value.gameRoom.board[Number(value.modal.payload)])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
