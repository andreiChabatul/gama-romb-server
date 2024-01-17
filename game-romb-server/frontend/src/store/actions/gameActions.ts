import { createAction, props } from '@ngrx/store';
import { chatMessage, infoAuction, infoCellTurn, offerDealInfo, updateCellCompany, updatePlayer } from 'src/app/types';
import { controlCompanyState, gameRoom, insideBoardState } from 'src/app/types/state';

export enum gameActionsTypes {
    EndGame = '[END GAME] EndGame',
    ControlInsideBoard = '[CONTROL INSIDE BOARD] ControlInsideBoard',
    ControlCompany = '[CONTROL COMPANY] ControlCompany',
    StartGame = '[START GAME] StartGame',
    UpdateChatRoom = '[UPDATE CHAT ROOM] UpdateChatRoom',
    UpdateCell = '[UPDATE CELL] UpdateCell',
    InfoAuction = '[INFO AUCTION] InfoAuction',
    SetOfferDealInfo = '[SET OFFER DEAL INFO] SetOfferDealInfo',
    UpdateInfoCellTurn = '[UPDATE INFO CELL TURN] UpdateInfoCellTurn',
    UpdateTurn = '[UPDATE TURN] UpdateTurn',
    UpdateInfoPlayer = '[UPDATE Player] UpdateInfoPlayer'
};

export const EndGame = createAction(gameActionsTypes.EndGame,
    props<{ winner: string }>()
);
export const ControlInsideBoard = createAction(gameActionsTypes.ControlInsideBoard,
    props<{ insideBoardState: insideBoardState }>()
);
export const ControlCompany = createAction(gameActionsTypes.ControlCompany,
    props<{ controlCompany: controlCompanyState }>()
);
export const StartGame = createAction(gameActionsTypes.StartGame,
    props<{ gameRoom: gameRoom }>()
);
export const UpdateChatRoom = createAction(gameActionsTypes.UpdateChatRoom,
    props<{ chatMessage: chatMessage }>()
);
export const UpdateCell = createAction(gameActionsTypes.UpdateCell,
    props<{ updateCell: updateCellCompany }>()
);
export const InfoAuction = createAction(gameActionsTypes.InfoAuction,
    props<{ infoAuction: infoAuction }>()
);
export const SetOfferDealInfo = createAction(gameActionsTypes.SetOfferDealInfo,
    props<{ offerDealInfo: offerDealInfo }>()
);
export const UpdateInfoCellTurn = createAction(gameActionsTypes.UpdateInfoCellTurn,
    props<{ infoCellTurn: infoCellTurn }>()
);
export const UpdateTurn = createAction(gameActionsTypes.UpdateTurn,
    props<{ turnId: string }>()
);
export const UpdateInfoPlayer = createAction(gameActionsTypes.UpdateInfoPlayer,
    props<{ updatePlayer: updatePlayer }>()
);
