import { infoRoom, infoCellTurn, chatMessage, playersGame, gameCell, offerDealInfo, infoAuction, modalState } from ".";

export interface AppStore {
    modalStore: modalStore;
    userStore: userStore;
    roomsStore: roomsStore;
    gameStore: gameRoom;
}

export type modalStore = {
    modalState: modalState,
    modalError?: string;
    payload?: number | string;
}

export type userStore = {
    isLogin: boolean;
    infoUser?: infoUser;
}
export type roomsStore = {
    infoRooms: infoRoom[],
    reconnectRoom?: infoRoom
}

export type infoUser = {
    createdAt: Date,
    id: string,
    image: string;
    nickName: string;
    numberGame: number;
    numberWin: number;
}

export type insideBoardState = 'playerInfo' | 'diceRoll' | 'startButtons' | 'infoCellTurn' | 'offerDeal' | 'receiveDeal' | 'auction' | 'winner' | undefined;
export type controlCompanyState = 'buyStock' | 'sellStock' | 'pledgeCompany' | 'buyOutCompany' | undefined;
export type controlCompany = { state: controlCompanyState, noSellStock: string[] }

export interface gameRoom {
    chat: chatMessage[];
    idRoom: string;
    players: playersGame;
    board: gameCell[];
    turnId: string;
    timeTurn: number;
    offerDealInfo?: offerDealInfo;
    infoAuction?: infoAuction;
    winner?: string;
    controlCompany: controlCompany;
    insideBoardState?: insideBoardState,
    infoCellTurn?: infoCellTurn,
}