export interface Player {
    id: string;
    name: string;
    image: string;
    total: number;
    capital: number;
    isTurn: boolean;
    numberPlayer: number;
}


export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    LIST_ROOM = 'list room',
    JOIN_GAME = 'join game',
    MESSAGE_CHAT = 'message chat',
    UPDATE_ROOM = 'update room'
}

export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
}

export interface Rooms {
    id: string;
    room: Room;
}

export interface RoomClass {
    returnInfoRoom(): InfoRoom;

}

export interface InfoRoom {
    maxPLayers: number,
    players: Player[],
    idRoom: string,
    isVisiblity: boolean,
    roomName: string
}


export interface Room {
    id: string;
    game: GameBoard;
    players: number;
    chat: ChatRoom;
}

export interface ChatMessage {
    player?: Player;
    message: string;
}

export interface GameBoard {

}

export interface ChatRoom {

}

export interface MessageChatGamePayload {
    idRoom: string;
    message: string;
    idUser: string;
}

export interface gameCell {
    indexCell: number;
    gridArea: string;
    isPledge?: boolean;
    players: string[];
    owned?: string;
    cellDirections: cellDirections;
    cellCompany?: GameCellCompanyInfo;
    cellSquare?: GameCellSquare;
}


export interface GameCellCompanyInfo {
    countryCompany: countryCompany;
    nameCompany: nameCompany;
    priceCompany: number;
    shares?: stockTypeCell[];
}

export interface GameCellSquare {
    imageCell: typeSquareImage;
    textCell: string;
}


export type cellDirections = 'top' | 'bottom' | 'left' | 'right';
export type stockTypeCell = 'stock' | 'stamp' | 'moneta';
export type typeSquareImage = 'inJail' | 'parking' | 'security' | 'start' | 'chance' | 'mysteryBox' | 'tax';
export type countryCompany = 'germany' | 'ukraine' | 'japan' | 'italia' | 'britania' | 'sweden' | 'canada' | 'kazah' | 'china' | 'usa';

export type nameCompany =
    'volkswagen' | 'allianz' | 'continental'
    | 'ferrari' | 'posteItaliane' | 'uniCredit'
    | 'ukranafta' | 'uia'
    | 'honda' | 'canon' | 'fujitsu' | 'mitsubishi'
    | 'ibm' | 'WD' | 'google'
    | 'rbc' | 'telus'
    | 'xiaomi' | 'aliexpress'
    | 'kaz' | 'kazAzot' | 'ttc'
    | 'volvo' | 'essity' | 'ericsson'
    | 'hsbc' | 'rr' | 'bp';



export interface PayloadJoinGame {
    idRoomJoin: string;
    idUser: string;
}