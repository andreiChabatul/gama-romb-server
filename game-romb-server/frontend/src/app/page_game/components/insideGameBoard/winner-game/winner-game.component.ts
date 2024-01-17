import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AudioServices } from 'src/app/shared/services/audio.services';
import { AppStore, gameRoom } from 'src/app/types/state';
import { selectInfoUser } from 'src/store/selectors';

@Component({
  selector: 'app-winner-game',
  templateUrl: './winner-game.component.html',
  styleUrls: ['./winner-game.component.scss']
})
export class WinnerGameComponent implements OnInit, OnDestroy {

  @Input() gameRoom: gameRoom;
  infoUser$ = this.store.select(selectInfoUser);
  nameWinner: string;
  photoWinner: string;
  isWinner: boolean;
  subscription$: Subscription;

  constructor(private store: Store<AppStore>, private audioServices: AudioServices) { }

  ngOnInit(): void {

    if (this.gameRoom.winner) {
      const player = this.gameRoom.players[this.gameRoom.winner];
      this.nameWinner = player.nickName;
      this.photoWinner = player.image;
    };
    this.subscription$ = this.infoUser$.subscribe((infoUser) =>
      this.isWinner = (infoUser?.id === this.gameRoom.winner)
    );
    if (this.isWinner) {
      this.audioServices.playAudioSpec('winner');
    };
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
