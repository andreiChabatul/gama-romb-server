import { CreateCellEmpty } from "src/game/dto/game.cell.empty.dto";

export interface Player {
    id: string;
    name: string;
    image: string;
    total: number;
    capital: number;
    cellPosition: number;
    isTurn: boolean;
    numberPlayer: number;
}

export interface PlayersGame {
    id: string;
    player: PlayerDefault;
}

export interface PlayerDefault {
    readonly player: Player;
    turnPlayer(): void;
    getNumberPlayer(): number;
    getCellPosition(): number;
    getTotalPlayer(): number;
    setTotalPlayer(value: number): void;
    getNamePlayer(): string;
    getWebSocket(): WebSocket;
}

export interface CellTaxI {
    valueTax: number;
    cellProcessing(player: PlayerDefault): void;
}

export interface CellCompanyI {
    buyCompany(buyer: PlayerDefault, price?: number): void
    cellProcessing(player: PlayerDefault): void;
    cancelBuyCompany(): void;
    auctionStep(player: PlayerDefault): void;
    auctionEnd(): void;


}

export type createCell = {
    company?: CompanyInfo;
    empty?: CreateCellEmpty
}

export type cells = CellTaxI | CellCompanyI;


export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    LIST_ROOM = 'list room',
    JOIN_GAME = 'join game',
    MESSAGE_CHAT = 'message chat',
    UPDATE_ROOM = 'update room',
    DICE_ROLL = 'dice roll',
    SELL_COMPANY = 'sell company',
    BUY_COMPANY = 'buy company',
    CANCEL_BUY = 'cancel buy',
    AUCTION_STEP = 'auction step',
    AUCTION_END = 'auction end'
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
    message: string;
    name?: string;
    numberPlayer?: number;
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

export interface DiceRollGamePayload {
    idRoom: string;
    value: number;
    isDouble: boolean;
    idUser: string;
}

export interface BuyCompanyPayload {
    idRoom: string;
    idUser: string;
    indexCompany: number;
}

export interface gameCell {
    indexCell: number;
    gridArea: string;
    players: number[];
    cellDirections: cellDirections;
    cellCompany?: GameCellCompanyInfo;
    cellSquare?: GameCellSquare;
}


export interface GameCellCompanyInfo extends CompanyInfo {
    shares?: stockTypeCell[];
    isPledge: boolean;
    owned?: number;
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

export interface CompanyInfo {
    countryCompany: countryCompany;
    nameCompany: nameCompany;
    priceCompany: number;
}

export interface CompanyInfoBuy extends CompanyInfo {
    indexCompany: number;
    rentCompany: number;
}