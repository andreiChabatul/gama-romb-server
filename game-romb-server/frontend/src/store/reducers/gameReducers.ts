import { createReducer, on } from "@ngrx/store";
import * as gameActions from '../actions/gameActions';
import { gameRoom } from "src/app/types/state";
import { EMPTY_GAME_ROOM } from "src/app/const";
import { immerOn } from 'ngrx-immer/store';
import { keyUpdatePlayer } from "src/app/types";
import { state } from "@angular/animations";

const initalState: gameRoom = EMPTY_GAME_ROOM;

export const gameReducers = createReducer(initalState,
    on(gameActions.EndGame, (state, { winner }) => ({ ...state, winner })),
    on(gameActions.ControlInsideBoard, (state, { insideBoardState }) => ({ ...state, insideBoardState })),
    on(gameActions.StartGame, (state, { gameRoom }) => ({ ...state, ...gameRoom })),
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
    }),
    immerOn(gameActions.ControlCompany, (initState, { state }) => {
        initState.controlCompany.state = state;
        return initState;
    }),
    immerOn(gameActions.ControlCompanyStock, (state, { noSellStock }) => {
        state.controlCompany.noSellStock.push(noSellStock);
        return state;
    }),
    immerOn(gameActions.ControlCompanyClear, (state) => {
        state.controlCompany.noSellStock = [];
        return state;
    }),
    immerOn(gameActions.UpdateChatRoom, (state, { chatMessage }) => {
        state.chat = [...state.chat, chatMessage];
        return state;
    }),
);
