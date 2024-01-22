import { createAction, props } from '@ngrx/store';
import { infoRoom } from 'src/app/types';

export enum roomsActionsTypes {
    UpdateRooms = '[UPDATE ROOMS] UpdateRooms',
    ReconnectRoom = '[RECONNECT ROOM] ReconnectRoom',
}

export const UpdateRooms = createAction(roomsActionsTypes.UpdateRooms,
    props<{ infoRooms: infoRoom[] }>()
);
export const ReconnectRoom = createAction(roomsActionsTypes.ReconnectRoom,
    props<{ reconnectRoom: infoRoom }>()
);
