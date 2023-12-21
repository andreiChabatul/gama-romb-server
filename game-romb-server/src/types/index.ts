import { ContorolCompanyPayload, ControlAuctionPayload, DiceRollGamePayload, MessageChatGamePayload, OfferDealPayload, StateGamePayload } from "./websocket";
import { chatMessage } from "./chat";
import { PlayerDefaultI, updatePlayer } from "./player";

export type infoCellButtons = 'pay' | 'buy' | 'none' | 'bankrupt';
export type controlCompany = 'buyStock' | 'sellStock' | 'pledgeCompany' | 'buyOutCompany';
export type controlAuction = 'startAuction' | 'leaveAuction' | 'stepAuction' | 'endAuction';
export type controlDeal = 'offer' | 'refuse' | 'accept';
export type cells = CellCompanyI | CellDefault;
export type cellType = 'company' | 'empty' | 'tax' | 'profit' | 'loss';
export type cellDirections = 'top' | 'bottom' | 'left' | 'right';
export type countryCompanyNoMonopoly = 'japan';
export type countryCompanyMonopoly = 'germany' | 'italia' | 'britania' | 'sweden' | 'canada' | 'kazah' | 'china' | 'usa' | 'ukraine';
export type countryCompany = countryCompanyNoMonopoly | countryCompanyMonopoly;
export type nameCell = nameCompany | nameCellEmpty;
export type dealPerson = 'offerPerson' | 'receivePerson';
export type statePlayer = 'active' | 'wait' | 'inactive';
export type nameCellEmpty = 'loss' | 'profit' | 'tax5' | 'tax10' | 'inJail' | 'parking' | 'start' | 'goJail' | 'security';
export type fullPlayer = mainPlayer & updatePlayer;

export type mainPlayer = {
    nickName: string;
    image: string;
    numberGame: number;
    numberWin: number;
}

export type prisonPlayer = {
    state: boolean;
    attempt: number;
}

export type playersGame = {
    [id: string]: PlayerDefaultI;
}

export interface CellDefault {
    _cellValue?: number;
    movePlayer(player: PlayerDefaultI, valueRoll?: number): void;
    get index(): number;
    activateCell(): void;
    sendInfoPLayer(idUser?: string): void;
}

export interface CellCompanyI extends CellDefault {
    controlCompany(action: controlCompany, player: PlayerDefaultI): void;
    buyCompany(player: PlayerDefaultI, price: number): void
    get owned(): string | null;
    get info(): updateInfoCompany;
    get infoCompany(): CompanyInfo;
    get rentCompany(): number;
    get pledge(): boolean;
    get quantityStock(): number;
    set monopoly(value: boolean);
    set quantityStock(value: number);
    set owned(player: string);
}

export interface companyCheckNoMonopoly {
    [key: number]: number[]
}

export type location = {
    gridArea: string,
    cellDirections: cellDirections,
}

export type rooms = {
    [id: string]: RoomI;
}

export interface RoomI {
    addPlayer(id: string, color: string): void;
    deletePlayer(idUser: string): void;
    oflinePlayer(idUser: string): void;
    playerMove(diceRollGamePayload: DiceRollGamePayload): void
    activeCell(idUser: string): void;
    addChatMessage(messageChatGamePayload: MessageChatGamePayload): void;
    controlAuction(controlAuctionPayload: ControlAuctionPayload): void;
    controlDeal(offerDealPayload: OfferDealPayload): void;
    controlCompany(contorolCompanyPayload: ContorolCompanyPayload): void;
    stateGame(stateGamePayload: StateGamePayload): void
    returnInfoRoom(): Promise<infoRoom>
    disconnectPlayer(idUser: string): void;
    reconnectPlayer(idUser: string): Promise<void>;
    get amountPlayers(): number;
}

export interface OfferServiceI {
    newOffer(offerDealInfo: offerDealInfo): void;
    acceptDeal(): void;
}

export interface AuctionI {
    leaveAuction(idUser: string): void;
    startAuction(cell: CellCompanyI, idUser: string): void;
    stepAuction(idUser: string): void;
}

export type infoRoom = {
    maxPlayers: number,
    idRoom: string,
    roomName: string,
    players: mainPlayer[],
}

export interface gameCell {
    type: cellType;
    location: location;
    indexCell: number;
    nameCell: string;
    company?: CompanyInfo;
}

export interface updateInfoCompany {
    shares: number;
    isPledge: boolean;
    owned: string;
    isMonopoly: boolean;
    rentCompany: number;
}

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

export interface CompanyInfo {
    countryCompany: countryCompany;
    priceCompany: number;
    collateralCompany: number;
    buyBackCompany: number;
    rentCompanyInfo?: number[];
    priceStock: number;
}

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
    [key in dealPerson]: offerInfo;
}

export type infoAuction = {
    currentPrice: number;
    currentPlayer: string;
    action: controlAuction;
    statePlayer: statePlayer;
    indexCompany: number;
}

export type gameRoom = {
    chat: chatMessage[];
    idRoom: string;
    players: playersGame,
    board: gameCell[];
    turnId: string;
    timeTurn: number;
    offerDealInfo?: offerDealInfo;
    infoAuction?: infoAuction;
}
