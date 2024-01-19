import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { EMPTY_GAME_ROOM } from 'src/app/const';
import { ACTIONS_BUTTON, EACTION_WEBSOCKET } from 'src/app/const/enum';
import { RoomsService } from 'src/app/rooms/rooms.services';
import { AppStore } from 'src/app/types/state';
import { WebSocketController } from 'src/app/webSocket/webSocket.controller';
import { ControlCompany, ControlInsideBoard, StartGame } from 'src/store/actions/gameActions';
import { closeModal, OpenModal } from 'src/store/actions/modalActions';
import { selectUser } from 'src/store/selectors';
import { AudioServices } from './audio.services';

@Injectable({
  providedIn: 'root'
})
export class ButtonControllerService implements OnDestroy {

  susbscription$: Subscription
  isLogin: boolean;
  user$ = this.store.select(selectUser);

  constructor(private store: Store<AppStore>,
    private webSocketController: WebSocketController,
    private router: Router,
    private roomsService: RoomsService,
    private audioServices: AudioServices) {
    this.susbscription$ = this.user$.pipe(
      map((user) => this.isLogin = user.isLogin)).subscribe()
  }

  actionButton(action: ACTIONS_BUTTON) {
    this.audioServices.playAudioSpec('buttonAction');
    switch (action) {

      case ACTIONS_BUTTON.NEW_GAME:
        (this.isLogin)
          ? this.store.dispatch(OpenModal({ payload: { modalState: 'createGame' } }))
          : this.store.dispatch(OpenModal({ payload: { modalState: 'logInProfile' } }));
        break;

      case ACTIONS_BUTTON.JOIN_GAME:
        (this.isLogin)
          ? this.router.navigate(['rooms'])
          : this.store.dispatch(OpenModal({ payload: { modalState: 'logInProfile' } }));
        break;

      case ACTIONS_BUTTON.UPDATE_ROOM:
        this.roomsService.getAllRooms();
        break;

      case ACTIONS_BUTTON.ADD_ROOM:
        this.store.dispatch(OpenModal({ payload: { modalState: 'createGame' } }));
        break;

      case ACTIONS_BUTTON.BUY_STOCK:
        this.store.dispatch(ControlCompany({ controlCompany: 'buyStock' }));
        break;

      case ACTIONS_BUTTON.SELL_STOCK:
        this.store.dispatch(ControlCompany({ controlCompany: 'sellStock' }));
        break;

      case ACTIONS_BUTTON.BUY_COMPANY:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.ACTIVE_CELL);
        break;

      case ACTIONS_BUTTON.START_AUCTION:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.AUCTION, { action: 'startAuction' });
        break;

      case ACTIONS_BUTTON.AUCTION_STEP:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.AUCTION, { action: 'stepAuction' });
        break;

      case ACTIONS_BUTTON.AUCTION_LEAVE:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.AUCTION, { action: 'leaveAuction' });
        break;

      case ACTIONS_BUTTON.DICE_ROLL:
        this.store.dispatch(ControlInsideBoard({ insideBoardState: 'diceRoll' }));
        break;

      case ACTIONS_BUTTON.MORTGAGE:
        this.store.dispatch(ControlCompany({ controlCompany: 'pledgeCompany' }));
        break;

      case ACTIONS_BUTTON.BUY_OUT_COMPANY:
        this.store.dispatch(ControlCompany({ controlCompany: 'buyOutCompany' }));
        break;

      case ACTIONS_BUTTON.END_CONTROL:
        this.store.dispatch(ControlCompany({ controlCompany: undefined }));
        break;

      case ACTIONS_BUTTON.PAY:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.ACTIVE_CELL);
        break;

      case ACTIONS_BUTTON.OFFER_DEAL:
        this.store.dispatch(ControlInsideBoard({ insideBoardState: 'offerDeal' }));
        break;

      case ACTIONS_BUTTON.ACCEPT_DEAL:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_DEAL, { action: 'accept' });
        break;

      case ACTIONS_BUTTON.REFUSE_DEAL:
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.CONTROL_DEAL, { action: 'refuse' });
        break;

      case ACTIONS_BUTTON.CANSEL_DEAL:
        this.store.dispatch(ControlInsideBoard({ insideBoardState: 'startButtons' }));
        break;

      case ACTIONS_BUTTON.LEAVE_GAME: {
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.END_GAME, { action: 'leave' });
        this.store.dispatch(StartGame({ gameRoom: EMPTY_GAME_ROOM }));
        this.store.dispatch(closeModal());
        this.router.navigate(['rooms']);
        break;
      }

      case ACTIONS_BUTTON.STAY_GAME: {
        this.webSocketController.sendMessage(EACTION_WEBSOCKET.END_GAME, { action: 'stay' });
        break;
      }

      case ACTIONS_BUTTON.GO_MAIN: {
        this.router.navigate(['/']);
        break;
      }

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.susbscription$.unsubscribe();
  }
}
