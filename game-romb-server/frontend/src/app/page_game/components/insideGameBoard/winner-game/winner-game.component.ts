import { Component, Input, OnInit } from '@angular/core';
import { AudioServices } from 'src/app/shared/services/audio.services';
import { fullPlayer } from 'src/app/types';
import { gameRoom } from 'src/app/types/state';


@Component({
  selector: 'app-winner-game',
  templateUrl: './winner-game.component.html',
  styleUrls: ['./winner-game.component.scss']
})
export class WinnerGameComponent implements OnInit {

  @Input() gameRoom: gameRoom;
  @Input() gamePlayer: fullPlayer;
  winner: fullPlayer;
  isWinner: boolean;

  constructor(private audioServices: AudioServices) { }

  ngOnInit(): void {
    this.isWinner = this.gamePlayer.id === this.gameRoom.winner;
    if (this.gameRoom.winner) this.winner = this.gameRoom.players[this.gameRoom.winner];
    if (this.isWinner) this.audioServices.playAudioSpec('winner');
  }

}
