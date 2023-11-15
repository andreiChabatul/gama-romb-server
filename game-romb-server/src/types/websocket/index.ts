import { WebSocket } from "ws";
import { controlCompany, controlDeal, infoCellButtons, offerDealInfo } from "..";

export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    LIST_ROOM = 'list room',
    JOIN_GAME = 'join game',
    MESSAGE_CHAT = 'message chat',
    UPDATE_PLAYER = 'update player',
    UPDATE_CHAT = 'update chat',
    DICE_ROLL = 'dice roll',
    INFO_CELL_TURN = 'info cell turn',
    END_TURN = 'end turn',
    CALC_VALUE_LS = 'calc value ls',
    UPDATE_CELL = 'update cell',
    START_GAME = 'start game',
    INIT_PLAYER = 'init player',
    INIT_BOARD = 'init board',
    UPDATE_TURN = 'update turn',
    CONTROL_COMPANY = 'control company',
    CONTROL_DEAL = 'control deal'
}

export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
}

export interface DefaultPayload {
    idRoom: string;
    idUser: string;
}

export interface PayloadJoinGame extends DefaultPayload {
    idRoomJoin: string;
}

export interface MessageChatGamePayload extends DefaultPayload {
    message: string;
}

export interface DiceRollGamePayload extends DefaultPayload {
    value: number;
    isDouble: boolean;
}

export interface ContorolCompanyPayload extends DefaultPayload {
    indexCompany: number;
    action: controlCompany;
}

export interface calcValuePayload extends DefaultPayload {
    debtValue?: number;
    indexCompany: number;
    action: infoCellButtons;
}

export interface OfferDealPayload extends DefaultPayload {
    offerDealInfo?: offerDealInfo;
    action: controlDeal;
}

export interface Room_WS {
    webSockets: { [id: string]: WebSocket };
    addWebSocket(is: string, webSocket: WebSocket): void;
    sendAllPlayers(action: EACTION_WEBSOCKET, payload?: {}): void;
    sendOnePlayer(id: string, action: EACTION_WEBSOCKET, payload?: {}): void;
}
