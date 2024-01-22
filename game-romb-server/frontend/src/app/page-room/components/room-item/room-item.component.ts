import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EACTION_WEBSOCKET } from 'src/app/const/enum';
import { fullPlayer, infoRoom } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { OpenModal } from 'src/store/actions/modalActions';
import { selectIdRoom, selectInfoUser } from 'src/store/selectors';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnChanges, OnDestroy {

  @Input() infoRoom: infoRoom;
  playerArr: (fullPlayer | null)[];
  isJoin: boolean;
  idUser: string | undefined;
  idRoom$ = this.store.select(selectIdRoom);
  subscription$: Subscription;

  constructor(private webSocketController: WebSocketController, private store: Store<AppStore>) { }

  ngOnChanges(): void {
    this.subscription$ = this.store.select(selectInfoUser).subscribe((infoUser) => this.idUser = infoUser?.id);
    this.isJoin = !!this.infoRoom.players.filter((player) => player.id === this.idUser).length;
    this.playerArr = [...this.infoRoom.players];
    while (this.playerArr.length < this.infoRoom.maxPlayers) {
      this.playerArr.push(null);
    }
  }

  clickControl(): void {
    this.isJoin ? this.leaveRoom() : this.joinRoom();
  }

  private joinRoom(): void {
    this.store.dispatch(OpenModal({ payload: { modalState: 'joinGame', payload: this.infoRoom.idRoom } }));
  }

  private leaveRoom(): void {
    this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_ROOM,
      {
        action: "leave",
        idRoom: this.infoRoom.idRoom
      });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
