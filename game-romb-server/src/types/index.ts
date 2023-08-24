export type stateCell = 'border' | playerType;
export type playerType = 'playerOne' | 'playerTwo' | 'playerThree' | 'playerFour' | 'none';
export type side = 'left' | 'top';

export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    LIST_ROOM = 'list room',
    JOIN_GAME = 'join game',
    MESSAGE_CHAT = 'message chat'
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
    id: string;
    game: GameBoard;
    players: number;
    chat: ChatRoom;
}

export interface ChatMessage {
    name: string;
    playerType: playerType;
    message: string;
}

export interface GameBoard {

}

export interface ChatRoom {

}

export interface MessageChatGamePayload {
    idGame: string;
    message: string;
    idUser: string;
}