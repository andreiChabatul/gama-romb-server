import { createReducer, on } from "@ngrx/store";
import * as gameActions from '../actions/gameActions';
import { gameRoom } from "src/app/types/state";
import { EMPTY_GAME_ROOM } from "src/app/const";
import { defaultCell } from "src/app/const/defaultCells";
import { immerOn } from 'ngrx-immer/store';
import { keyUpdatePlayer } from "src/app/types";

const initalState: gameRoom = EMPTY_GAME_ROOM;

export const gameReducers = createReducer(initalState,
    on(gameActions.EndGame, (state, { winner }) => ({ ...state, winner })),
    on(gameActions.ControlInsideBoard, (state, { insideBoardState }) => ({ ...state, insideBoardState })),
    on(gameActions.ControlCompany, (state, { controlCompany }) => ({ ...state, controlCompany })),
    on(gameActions.StartGame, (_, { gameRoom }) => ({ ...gameRoom, board: defaultCell })),
    on(gameActions.UpdateChatRoom, (state, { chatMessage }) => ({ ...state, chat: [...state.chat, chatMessage] })),
    on(gameActions.InfoAuction, (state, { infoAuction }) => ({ ...state, infoAuction })),
    on(gameActions.SetOfferDealInfo, (state, { offerDealInfo }) => ({ ...state, offerDealInfo })),
    on(gameActions.UpdateInfoCellTurn, (state, { infoCellTurn }) => ({ ...state, infoCellTurn })),
    on(gameActions.UpdateTurn, (state, { turnId }) => ({ ...state, infoCellTurn: undefined, turnId })),
    immerOn(gameActions.UpdateInfoPlayer, (state, { updatePlayer }) => {
        (Object.keys(updatePlayer) as keyUpdatePlayer[]).forEach((value) =>
            state.players[updatePlayer.id] ? state.players[updatePlayer.id][value] = updatePlayer[value] : '');
        return state;
    }),
    immerOn(gameActions.UpdateCell, (state, { updateCell }) => {
        const cellCompany = state.board[updateCell.indexCell].company;
        if (cellCompany) {
            state.board[updateCell.indexCell].company = { ...cellCompany, ...updateCell.company }
        }
        return state;
    })
);
