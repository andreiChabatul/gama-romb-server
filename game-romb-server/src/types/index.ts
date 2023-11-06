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
    set addTotal(value: number);
    minusTotal(value: number, action?: EMESSAGE_CLIENT, cellId?: number): void;
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
    get rentCompany(): number
    set monopoly(value: boolean);
    set quantityStock(value: number);
    set owned(userId: string);
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

export type cells = CellEmptyI | CellCompanyI;

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
    valueroll?: number,
}

export interface gameCell extends createCell {
    indexCell: number;
    cellCompany?: GameCellCompanyInfo;
}

export interface createCell {
    location: location;
    nameCell: nameCell;
    type: companyType;
    company?: CompanyInfo;
}

export type companyType = 'company' | 'lossProfit' | 'empty';

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

export type nameCell = nameCompany | nameCellEmpty;
export type nameCellEmpty = 'loss' | 'profit' | 'tax5' | 'tax10' | 'inJail' | 'parking' | 'start' | 'goJail' | 'security';
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

export type infoCellButtons = 'auction' | 'pay' | 'buy' | 'none' | 'payRent' | 'payPrison' | 'profit';
export type controlCompany = 'buyStock' | 'sellStock' | 'pledgeCompany' | 'buyOutCompany' | 'buyCompany' | 'startAuction' | 'leaveAuction' | 'stepAuction';
export type controlDeal = 'offer' | 'refuse' | 'accept';

export type infoCellTurn = {
    indexCompany: number;
    buttons: infoCellButtons;
    description?: string;
}

export type offerInfo = {
    indexCompany: number[];
    valueMoney: number;
    idPerson: string;
}

export type offerDealInfo = {
    offerPerson?: offerInfo,
    receivePerson?: offerInfo,
}