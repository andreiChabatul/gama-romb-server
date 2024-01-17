
import { createSelector } from "@ngrx/store";
import { AppStore, gameRoom, modalStore, roomsStore, userStore } from "src/app/types/state";

const selectmodal = (state: AppStore) => state.modalStore;
const selectuser = (state: AppStore) => state.userStore;
const selectgame = (state: AppStore) => state.gameStore;
const selectrooms = (state: AppStore) => state.roomsStore;

export const selectModal = createSelector(selectmodal, (state: modalStore) => state);
export const selectUser = createSelector(selectuser, (state: userStore) => state);
export const selectInfoUser = createSelector(selectuser, (state: userStore) => state.infoUser);
export const selectAllRooms = createSelector(selectrooms, (state: roomsStore) => state.infoRooms);
export const selectReconnectRoom = createSelector(selectrooms, (state: roomsStore) => state.reconnectRoom);
export const selectGameRoom = createSelector(selectgame, (state: gameRoom) => state);
export const selectAllPlayerArr = createSelector(selectgame, (state: gameRoom) => Object.values(state.players));
export const selectPlayerTurnId = createSelector(selectgame, (state: gameRoom) => state.turnId);
export const selectIdRoom = createSelector(selectgame, (state: gameRoom) => state.idRoom);
export const selectGamePlayer = createSelector(
    selectgame,
    selectUser,
    (selectGame: gameRoom, selectUser: userStore) =>
        (selectGame && selectUser.infoUser)
            ? selectGame.players[selectUser.infoUser?.id]
            : null
);
