import { Component, HostListener, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { fullPlayer } from 'src/app/types';
import { AppStore, gameRoom } from 'src/app/types/state';
import { ControlInsideBoard } from 'src/store/actions/gameActions';

@Component({
  selector: 'app-game-board-turn',
  templateUrl: './game-board-turn.component.html',
  styleUrls: ['./game-board-turn.component.scss'],

})
export class GameBoardTurnComponent implements OnInit {

  @Input() gameRoom: gameRoom;
  @Input() gamePlayer: fullPlayer;

  cheatNumbers: number[];

  constructor(private store: Store<AppStore>) { }

  ngOnInit(): void {
    this.cheatNumbers = [];
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    const value = Number(event.key);
    if (0 < value && value < 7) {
      this.cheatNumbers = [value, ...this.cheatNumbers];
    }
    if (this.gameRoom.insideBoardState === 'startButtons' && event.key === 'Enter') {
      this.store.dispatch(ControlInsideBoard({ insideBoardState: 'diceRoll' }));
    }
  }

  resetCheat(): void {
    this.cheatNumbers = [];
  }

  get isTurnTimer(): boolean {
    return (
      this.gameRoom.insideBoardState === 'receiveDeal' ||
      this.gameRoom.insideBoardState === 'startButtons' ||
      this.gameRoom.insideBoardState === 'infoCellTurn' && this.gameRoom.infoCellTurn?.buttons !== 'none' ||
      this.gameRoom.insideBoardState === 'auction' && this.gameRoom.infoAuction?.statePlayer === 'active');
  }

}
