import { createReducer, on } from "@ngrx/store";
import * as modalActions from '../actions/modalActions';
import { modalStore } from "src/app/types/state";
import { modalState } from "src/app/types";

const initalState: modalStore = {
    modalState: 'none',
    modalError: ''
}

export const modalReducers = createReducer(initalState,
    on(modalActions.closeModal, (_) => ({ modalState: 'none' as modalState })),
    on(modalActions.closeModal, (_) => ({ modalState: 'none' as modalState })),
    on(modalActions.ClearModalInfo, (state) => ({ ...state, modalError: '' })),
    on(modalActions.OpenModal, (_, { payload }) => ({ ...payload })),
    on(modalActions.AddModalInfo, (state, { modalError }) => ({ ...state, modalError }))
)
