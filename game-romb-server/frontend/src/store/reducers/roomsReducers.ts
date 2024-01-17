import { createReducer, on } from "@ngrx/store";
import * as roomsActions from '../actions/roomsActions';
import { roomsStore } from "src/app/types/state";

const initalState: roomsStore = {
    infoRooms: []
};

export const roomsReducers = createReducer(initalState,
    on(roomsActions.UpdateRooms, (state, { infoRooms }) => ({ ...state, infoRooms })),
    on(roomsActions.ReconnectRoom, (state, { reconnectRoom }) => ({ ...state, reconnectRoom }))
)
