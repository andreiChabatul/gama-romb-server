import { createReducer, on } from "@ngrx/store";
import * as userActions from '../actions//userActions';
import { userStore } from "src/app/types/state";
import { EMPTY_USER } from "src/app/const";

const initalState: userStore = {
    isLogin: false
}

export const userReducers = createReducer(initalState,
    on(userActions.logoutUser, (_) => ({ isLogin: false })),
    on(userActions.loginUser, (_, { payload }) => ({ isLogin: true, infoUser: { ...EMPTY_USER, ...payload } })),
    on(userActions.UpdateUser, (state, { payload }) => ({ ...state, infoUser: { ...EMPTY_USER, ...state.infoUser, ...payload } }))
)
