import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { fullPlayer, gameCell, offerInfo } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectGameRoom } from 'src/store/selectors';

@Component({
  selector: 'app-receive-deal-item',
  templateUrl: './receive-deal-item.component.html',
  styleUrls: ['./receive-deal-item.component.scss']
})
export class ReceiveDealItemComponent {

  @Input() offerInfo: offerInfo | undefined;
  gameRoom$ = this.store.select(selectGameRoom);

  constructor(private store: Store<AppStore>) { }

  get player(): Observable<fullPlayer> {
    return this.gameRoom$.pipe(
      map((gameRoom) => gameRoom.players[String(this.offerInfo?.idPerson)]))
  }

  get companyPlayer(): Observable<gameCell[]> {
    return this.gameRoom$.pipe(
      map((gameRoom) => gameRoom.board.filter((cell) => this.offerInfo?.indexCompany.includes(cell.indexCell)))
    )
  }

}
