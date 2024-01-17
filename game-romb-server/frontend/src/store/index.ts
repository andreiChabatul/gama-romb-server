import { AppStore } from 'src/app/types/state';
import { ActionReducerMap } from '@ngrx/store';
import { modalReducers } from './reducers/modalReducers';
import { userReducers } from './reducers/usersRedusers';
import { roomsReducers } from './reducers/roomsReducers';
import { gameReducers } from './reducers/gameReducers';

export const appReducers: ActionReducerMap<AppStore, any> = {
    modalStore: modalReducers,
    userStore: userReducers,
    roomsStore: roomsReducers,
    gameStore: gameReducers
};
