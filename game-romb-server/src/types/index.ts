import { EMESSAGE_CLIENT } from "src/app/const/enum";

export interface Player extends UpdatePlayer {
    name: string;
    image: string;
    color: string;
}

export interface UpdatePlayer {
    id: string;
    total: number;
    capital: number;
    cellPosition: number;
    prison?: boolean;
}

export type PlayersGame = {
    [id: string]: PlayerDefaultI;
}

export interface PrisonI {
    addPrisoner(player: PlayerDefaultI): void;
    deletePrisoner(player: PlayerDefaultI): void;
    turnPrison(player: PlayerDefaultI, value: number, isDouble: boolean): void;
}



export interface ChatI {
    readonly messages: ChatMessage[];
    addMessage(message: string, player: PlayerDefaultI): void;
    addSystemMessage(systemMessage: SystemMessage): void;
    updateChat(): void;
}

export interface PlayerDefaultI {
    get position(): number;
    get total(): number;
    get name(): string;
    set position(value: number);
    get userId(): string;
    get player(): Player;
    get color(): string;
    setTotalPlayer(value: number): void;
    buyCompany(price: number): void;
    enrollRentCompany(rent: number): void;
    payRentCompany(rent: number, player: PlayerDefaultI): void;
    payDebt(debt: number): void;
    set addTotal(value: number);
    set minusTotal(value: number);
    get prison(): boolean;
    set prison(value: boolean);
}

export interface CellI {
    cellProcessing(player: PlayerDefaultI, valueRoll?: number): void;
    get index(): number;
}


export interface CellCompanyI extends CellI {
    controlCompany(action: controlCompany, player: PlayerDefaultI, price?: number): void;
    get owned(): string | null;
    get info(): GameCellCompanyInfo;
    get infoCompany(): CompanyInfo;
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


export type location = {
    gridArea: string,
    cellDirections: cellDirections,
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

export interface ChatMessage extends SystemMessage {
    message?: string;
    senderName?: string;
    senderColor?: string;
}

export interface SystemMessage {
    action?: EMESSAGE_CLIENT,
    playerId?: string,
    cellId?: number,
    valueroll?: number
}


export type gameCell = {
    location: location;
    indexCell: number;
    nameCell: nameCell;
    cellCompany?: GameCellCompanyInfo;
}

export type createCell = {
    location: location;
    nameCell: nameCell;
    type: 'company' | 'lossProfit' | 'empty';
    company?: CompanyInfo;
}

export interface GameCellCompanyInfo extends CompanyInfo {
    shares: number;
    isPledge: boolean;
    owned?: string;
}

export type cellDirections = 'top' | 'bottom' | 'left' | 'right';
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

export type nameCell = nameCompany |  'loss' | 'profit' | 'tax5' | 'tax10' | 'inJail' | 'parking' | 'start' | 'goJail' | 'security' | 'tax';

export interface CompanyInfo {
    countryCompany: countryCompany;
    priceCompany: number;
    collateralCompany: number;
    buyBackCompany: number;
    rentCompanyInfo?: number[];
    rentCompany?: number;
    isMonopoly?: boolean;
    priceStock?: number;
}

export interface CompanyInfoBuy extends CompanyInfo {
    indexCompany: number;
}

export type infoCellButtons = 'auction' | 'pay' | 'buy' | 'none';
export type controlCompany = 'buyStock' | 'sellStock' | 'pledgeCompany' | 'buyOutCompany' | 'buyCompany' | 'startAuction' | 'leaveAuction' | 'stepAuction';

export type infoCellTurn = {
    nameCell: nameCell;
    titleCell: string;
    description: string;
    descriptionTwo?: string;
    indexCompany?: number;
    buttons: infoCellButtons;
    dept?: number;
    receiverId?: string;
}