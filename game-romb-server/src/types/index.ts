import { EMESSAGE_CLIENT } from "src/app/const/enum";
import { ContorolCompanyPayload, DiceRollGamePayload, OfferDealPayload } from "./websocket";
import { WebSocket } from "ws";

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
    prison: prisonPlayer;
    bankrupt: boolean;
}

export type prisonPlayer = {
    state: boolean;
    attempt: number;
}

export type PlayersGame = {
    [id: string]: PlayerDefaultI;
}

export interface PrisonI {
    addPrisoner(player: PlayerDefaultI): void;
    deletePrisoner(player: PlayerDefaultI): void;
    turnPrison(player: PlayerDefaultI, value: number, isDouble: boolean): void;
    payDebt(player: PlayerDefaultI): void;
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
    set attemptPrison(value: number);
    get attemptPrison(): number;
    get capital(): number;
    set bankrupt(value: boolean);
    get bankrupt(): boolean;

}

export interface CellDefault {
    _cellValue?: number;
    movePlayer(player: PlayerDefaultI, valueRoll?: number): void;
    get index(): number;
    activateCell(): void;
    sendInfoPLayer(): void;
}

export interface CellCompanyI extends CellDefault {
    controlCompany(action: controlCompany, player: PlayerDefaultI): void;
    get owned(): string | null;
    get info(): GameCellCompanyInfo;
    get infoCompany(): CompanyInfo;
    get rentCompany(): number;
    get pledge(): boolean;
    get quantityStock(): number;
    set monopoly(value: boolean);
    set quantityStock(value: number);
    set owned(player: string);
}

export interface CellEmptyI extends CellDefault {

    checkPayCell(): infoCellButtons;
}

export interface companyCheckNoMonopoly {
    [key: number]: number[]
}

export type location = {
    gridArea: string,
    cellDirections: cellDirections,
}

export type cells = CellEmptyI | CellCompanyI | CellDefault;

export type rooms = {
    [id: string]: RoomI;
}

export interface RoomI {
    addPlayer(id: string, client: WebSocket): void;
    playerMove(diceRollGamePayload: DiceRollGamePayload): void
    activeCell(idUser: string): void;
    controlCompany(contorolCompanyPayload: ContorolCompanyPayload): void;
    offerDealControl(offerDealPayload: OfferDealPayload): void;
    addChatMessage(message: string, idUser: string): void
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
    type: cellType;
    company?: CompanyInfo;
}

export type cellType = 'company' | 'empty' | 'tax' | 'profit' | 'loss';

export interface GameCellCompanyInfo {
    companyInfo: CompanyInfo
    shares: number;
    isPledge: boolean;
    owned: string;
    isMonopoly: boolean;
    rentCompany: number;
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
    priceStock: number;
}

export type infoCellButtons = 'auction' | 'pay' | 'buy' | 'none' | 'bankrupt';
export type controlCompany = 'buyStock' | 'sellStock' | 'pledgeCompany' | 'buyOutCompany';
export type controlAuction = 'startAuction' | 'leaveAuction' | 'stepAuction';
export type controlDeal = 'offer' | 'refuse' | 'accept';

export type infoCellTurn = {
    indexCompany: number;
    buttons: infoCellButtons;
    description: string;
    value?: number;
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