import { EACTION_WEBSOCKET } from "../const/enum"

export type PayloadCreateGame = {
    roomName: string
    players: string
    size: string
    typeGame: string
    visibility: string
}

export type DiceRoolGamePayload = {
    value: number;
    isDouble: boolean;
}

export type ControlCompanyPayload = {
    indexCompany: number;
    action: controlCompany
}

export type controlCompany = 'buyStock' | 'sellStock' | 'pledgeCompany' | 'buyOutCompany';
export type controlAuction = 'startAuction' | 'leaveAuction' | 'stepAuction' | 'endAction';

export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
}