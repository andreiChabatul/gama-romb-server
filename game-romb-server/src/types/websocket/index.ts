import { WebSocket } from "ws";
import { controlAuction, controlCompany, controlDeal, offerDealInfo } from "..";

export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    JOIN_GAME = 'join game',
    LIST_ROOM = 'list room',
    MESSAGE_CHAT = 'message chat',
    INIT_PLAYER = 'init player',
    INIT_BOARD = 'init board',
    UPDATE_CHAT = 'update chat',
    UPDATE_CELL = 'update cell',
    UPDATE_PLAYER = 'update player',
    UPDATE_TURN = 'update turn',
    DICE_ROLL = 'dice roll',
    INFO_CELL_TURN = 'info cell turn',
    END_TURN = 'end turn',
    START_GAME = 'start game',
    CONTROL_COMPANY = 'control company',
    CONTROL_DEAL = 'control deal',
    BANKRUPT = 'bankrupt',
    ACTIVE_CELL = 'active cell',
    AUCTION = 'auction'
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

export interface ControlAuctionPayload extends DefaultPayload {
    action: controlAuction;
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
