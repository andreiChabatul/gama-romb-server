import { WebSocket } from "ws";
import { controlAuction, controlCompany, controlDeal, offerDealInfo } from "..";

export interface myWebSocket extends WebSocket {
    idUser?: string;
    idRoom?: string;
}

export enum EACTION_WEBSOCKET {
    RECONNECT = 'reconnect',
    CONTROL_ROOM = 'control room',
    UPDATE_CHAT = 'update chat',
    UPDATE_CELL = 'update cell',
    UPDATE_PLAYER = 'update player',
    UPDATE_TURN = 'update turn',
    DICE_ROLL = 'dice roll',
    INFO_CELL_TURN = 'info cell turn',
    START_GAME = 'start game',
    CONTROL_COMPANY = 'control company',
    CONTROL_DEAL = 'control deal',
    ACTIVE_CELL = 'active cell',
    AUCTION = 'auction',
    END_GAME = 'end game'
}

export type controlRoom = 'leave' | 'join';
export type stateGameAction = 'leave' | 'stay' | 'endGame';
export type payloadSocket = [EACTION_WEBSOCKET, DefaultPayload];

export interface ControlRoomPayload extends DefaultPayload {
    action: controlRoom;
    colorPlayer?: string;
}

export interface DefaultPayload {
    idRoom: string;
    idUser: string;
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

export interface StateGamePayload extends DefaultPayload {
    action: stateGameAction;
}

export interface OfferDealPayload extends DefaultPayload {
    offerDealInfo?: offerDealInfo;
    action: controlDeal;
}