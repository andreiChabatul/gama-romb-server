
import { gameRoom, infoUser } from "../types/state";
import { defaultCell } from "./defaultCells";

export const COLOR_PLAYER_DEFAULT = '#DBE0E4';
export const AUDIO_SRC = '../../../assets/audio/';
export const STANDART_VOLUME = 50;
export const TIME_TURN_DEFAULT = 1500;
export const DEBT_PRISON = 50000;
export const MAX_INDEX_CELL_BOARD = 38;
export const BASIC_URL = "http://localhost:3000/";
export const EMPTY_GAME_ROOM: gameRoom = { idRoom: '', players: {}, board: defaultCell, chat: [], turnId: '', timeTurn: 0, controlCompany: { state: undefined, noSellStock: [] } };
export const EMPTY_USER: infoUser = { id: '', createdAt: new Date, image: '', nickName: '12', numberGame: 5, numberWin: 1 };