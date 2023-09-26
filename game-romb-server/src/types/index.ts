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
    buyCompany(price: number): void;
    payRentCompany(rent: number): void;
    enrollRentCompany(rent: number): void;
    buyStock(value: number, nameCompany: string): void
}

export interface CellI {
    cellProcessing(player: PlayerDefault, valueRoll?: number): void;
}

export interface CellTaxI extends CellI {
    valueTax: number;
}

export interface CellCompanyI extends CellI {
    buyCompany(buyer: PlayerDefault, price?: number): void
    setMonopoly(value: boolean): void;
    getOwned(): number | null;
    getCountryCompany(): countryCompany;
    buyStock(player: PlayerDefault): void;
    getIndexCompany(): number;
    setQuantityStock(value: number): void;
    getCompanyInfo(): CompanyInfo;
}

export interface CellProfitLossI extends CellI {

}

export interface companyCheckNoMonopoly {
    [key: number]: number[]
}

export type createCell = {
    type: 'company' | 'lossProfit' | ''
    company?: CompanyInfo;
    change?: changeCell;
    empty?: CreateCellEmpty
}

export type dataChange = {
    en: changeData[],
    ru: changeData[],
}

export type changeData = {
    description: string,
    value: number
}

export type changeCell = 'loss' | 'profit' | 'tax5' | 'tax10';

export type cells = CellTaxI | CellCompanyI | CellProfitLossI;


export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    LIST_ROOM = 'list room',
    JOIN_GAME = 'join game',
    MESSAGE_CHAT = 'message chat',
    UPDATE_ROOM = 'update room',
    UPDATE_CHAT = 'update chat',
    DICE_ROLL = 'dice roll',
    BUY_COMPANY = 'buy company',
    START_AUCTION = 'start auction',
    AUCTION_STEP = 'auction step',
    AUCTION_LEAVE = 'auction leave',
    BUY_STOCK = 'buy stock',
    INFO_CELL_TURN = 'info cell turn'
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
    shares: number;
    isPledge: boolean;
    owned?: number;
}

export interface GameCellSquare {
    imageCell: typeSquareImage;
    textCell: string;
}

export type cellDirections = 'top' | 'bottom' | 'left' | 'right';
export type typeSquareImage = 'inJail' | 'parking' | 'security' | 'start' | 'profit' | 'loss' | 'tax' | 'ukraine';
export type countryCompanyNoMonopoly = 'japan';
export type countryCompanyMonopoly = 'germany' | 'italia' | 'britania' | 'sweden' | 'canada' | 'kazah' | 'china' | 'usa' | 'ukraine';
export type countryCompany = countryCompanyNoMonopoly | countryCompanyMonopoly;

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
    rentCompanyInfo?: number[];
    rentCompany?: number;
    isMonopoly?: boolean;
    priceStock?: number;
}

export interface CompanyInfoBuy extends CompanyInfo {
    indexCompany: number;
}

export type language = 'en' | 'ru';
export type chatMessageKey = 'startAuction'

export type chatMessage = {
    startAuction: string,
}
export type languageMessage = {
    en: chatMessage,
    ru: chatMessage
};

export type infoCellButtons = 'auction' | 'pay' | 'buy' | 'none';

export type infoCellTurn = {
    nameCell: nameCompany | typeSquareImage;
    titleCell: string;
    description: string;
    indexCompany: number;
    buttons: infoCellButtons;
}