import { EACTION_WEBSOCKET } from "./websocket";

export interface Player extends UpdatePlayer {
    name: string;
    image: string;
    numberPlayer: number;
}

export interface UpdatePlayer {
    id: string;
    total: number;
    capital: number;
    cellPosition: number;
}

export interface PlayersGame {
    [id: string]: PlayerDefaultI;
}


export interface ChatI {
    readonly messages: ChatMessage[];
    addMessage(message: string, player?: PlayerDefaultI): void;
    updateChat(): void;
}

export interface PlayerDefaultI {
    get position(): number;
    get total(): number;
    get name(): string;
    get playerNumber(): number;
    set position(value: number);
    get userId(): string;
    get player(): Player;

    setTotalPlayer(value: number): void;
    buyCompany(price: number): void;
    enrollRentCompany(rent: number): void;
    buyStock(value: number, nameCompany: string): void;
    payRentCompany(rent: number, player: PlayerDefaultI): void;
    payDebt(debt: number): void;
    addTotal(value: number): void;
}

export interface CellI {
    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void;
    sendInfoCell(): void;
}


export interface CellCompanyI extends CellI {
    buyCompany(buyer: PlayerDefaultI, price?: number): void
    buyStock(player: PlayerDefaultI): void;
    get index(): number;
    get owned(): number | null
    get info(): CompanyInfo;
    set monopoly(value: boolean);
    set quantityStock(value: number);
}

export interface CellProfitLossI extends CellI {

}

export interface CellEmptyI extends CellI {

}

export interface companyCheckNoMonopoly {
    [key: number]: number[]
}

export type createCell = {
    type: 'company' | 'lossProfit' | 'empty' | '';
    company?: CompanyInfo;
    change?: changeCell;
    empty?: emptyCell;
}

export type dataChange = {
    en: changeData[],
    ru: changeData[],
}

export type changeData = {
    description: string,
    value: number
}

export type cells = CellEmptyI | CellCompanyI | CellProfitLossI;
export interface Rooms {
    id: string;
    room: RoomClass;
}

export interface RoomClass {
    returnInfoRoom(): InfoRoom;

}

export interface InfoRoom {
    maxPLayers: number,
    idRoom: string,
    isVisiblity: boolean,
    roomName: string
}

export type UpdateRoom = {
    idRoom: string;
    turnId: string;
}

export interface ChatMessage {
    message: string;
    name?: string;
    numberPlayer?: number;
}

export interface gameCell {
    indexCell: number;
    cellCompany?: GameCellCompanyInfo;
    cellSquare?: GameCellSquare;
}


export interface GameCellCompanyInfo extends CompanyInfo {
    shares: number;
    isPledge: boolean;
    owned?: number;
}

export interface GameCellSquare {
    imageCell: typeSquareImage | changeCell | emptyCell;
    textCell: string;
}

export type cellDirections = 'top' | 'bottom' | 'left' | 'right';
export type typeSquareImage = 'security' | 'tax';
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


export type changeCell = 'loss' | 'profit' | 'tax5' | 'tax10';
export type emptyCell = 'inJail' | 'parking' | 'start';

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
    nameCell: nameCompany | typeSquareImage | changeCell | emptyCell;
    titleCell: string;
    description: string;
    descriptionTwo?: string;
    indexCompany?: number;
    buttons: infoCellButtons;
    dept?: number;
}