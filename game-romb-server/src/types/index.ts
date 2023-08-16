export type stateCell = 'border' | playerType;
export type playerType = 'playerOne' | 'playerTwo' | 'playerThree' | 'playerFour' | 'none';
export type side = 'left' | 'top';

export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game'
}

export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
}

export interface PayloadCreateGame {
    roomName: string
    players: string
    size: string
    typeGame: string
    visibility: string
}

export interface Cell {
    indexCell: number;
    left: stateCell;
    top: stateCell;
    occupied: stateCell;
}

export interface Room {
    id: number;
    room: GameBoard;
}

export interface GameBoard {

}