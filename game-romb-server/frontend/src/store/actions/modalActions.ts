import { createAction, props } from '@ngrx/store';
import { modalStore } from 'src/app/types/state';

export enum modalActionsTypes {
    CloseModal = '[CLOSE MODAL] CloseModal',
    OpenModal = '[OPEN MODAL] OpenModal',
    AddModalInfo = '[ADD MODAL INFO] AddModalInfo',
    ClearModalInfo = '[CLEAR MODAL INFO] ClearModalInfo',
};

export const closeModal = createAction(modalActionsTypes.CloseModal);
export const ClearModalInfo = createAction(modalActionsTypes.ClearModalInfo);
export const OpenModal = createAction(modalActionsTypes.OpenModal,
    props<{ payload: modalStore }>()
);
export const AddModalInfo = createAction(modalActionsTypes.AddModalInfo,
    props<{ modalError?: string }>()
);
