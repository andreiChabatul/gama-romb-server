import { WebSocket } from "ws";
import { controlAuction, controlCompany, controlDeal, offerDealInfo } from "..";

export enum EACTION_WEBSOCKET {
    LIST_ROOM = 'list room',
    CONTROL_ROOM = 'control room',
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
    AUCTION = 'auction',
    END_GAME = 'end game'
}

export type controlRoom = 'create' | 'leave' | 'join' | 'list';
export type endGameAction = 'leave' | 'stay' | 'endGame' | 'endTime';
export type gameCreate = {
    roomName: string
    maxPlayers: number
    timeTurn: number
    idUser: string
    colorPlayer: string;
}
export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
}

export interface ControlRoomPayload extends DefaultPayload {
    action: controlRoom;
    gameCreate: gameCreate;
    idRoomJoin?: string;
    colorPlayer?: string;
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

export interface EndGamePayload extends DefaultPayload {
    action: endGameAction;
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
    leavePlayer(idUser: string): void;
}
