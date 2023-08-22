export type stateCell = 'border' | playerType;
export type playerType = 'playerOne' | 'playerTwo' | 'playerThree' | 'playerFour' | 'none';
export type side = 'left' | 'top';

export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
<<<<<<< HEAD
    LIST_ROOM = 'list room',
=======
    LIST_ROOM = 'list room'
>>>>>>> de95c6b97e83d7a9a5136b8e87d639c19ac6eaee
}

export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
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
    players: number;
}

export interface GameBoard {

}