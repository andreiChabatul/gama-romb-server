import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY_GAME_ROOM, TIME_TURN_DEFAULT } from 'src/app/const';
import { EACTION_WEBSOCKET } from 'src/app/const/enum';
import { typeLoading } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { StartGame } from 'src/store/actions/gameActions';
import { closeModal } from 'src/store/actions/modalActions';
import { AudioServices } from '../../services/audio.services';

@Component({
  selector: 'app-loader-time',
  templateUrl: './loader-time.component.html',
  styleUrls: ['./loader-time.component.scss'],
  animations: [
    trigger('loaderAnimation', [
      transition('void => *', [
        style({
          width: '0'
        }),
        animate(TIME_TURN_DEFAULT, style({
          width: '100%'
        })),
      ])
    ])
  ]
})
export class LoaderTimeComponent implements OnInit {

  isSend: boolean;
  @Input() typeLoading: typeLoading;

  constructor(
    private webSocketController: WebSocketController,
    private router: Router,
    private store: Store<AppStore>,
    private audioServices: AudioServices) { }

  ngOnInit(): void {
    this.isSend = true;
  }

  loadingEnd(): void {
    if (this.isSend) {
      switch (this.typeLoading) {
        case 'cell':
          this.webSocketController.sendMessage(EACTION_WEBSOCKET.ACTIVE_CELL);
          this.audioServices.playAudioEmpty();
          break;
        case 'auction':
          this.webSocketController.sendMessage(EACTION_WEBSOCKET.AUCTION, { action: 'endAuction' });
          break;
        case 'startAuction':
          this.webSocketController.sendMessage(EACTION_WEBSOCKET.AUCTION, { action: 'startAuction' });
          break;
        case 'startGame':
          this.store.dispatch(closeModal());
          this.router.navigate(['game']);
          break;
        case 'endGame':
          this.webSocketController.sendMessage(EACTION_WEBSOCKET.END_GAME, { action: 'endGame' });
          this.store.dispatch(StartGame({ gameRoom: EMPTY_GAME_ROOM }));
          this.router.navigate(['rooms']);
          break;
        default:
          break;
      }
      this.isSend = false;
    }
  }

}
