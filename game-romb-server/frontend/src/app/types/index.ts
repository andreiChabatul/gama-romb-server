export type modalState = 'none' | 'logInProfile' | 'register' | 'infoCell' | 'leaveGame' | 'createGame' | 'joinGame' | 'reconnectGame' | 'editProfile' | 'deleteProfile';
export type cellDirections = 'top' | 'bottom' | 'left' | 'right';
export type infoCellButtons = 'pay' | 'buy' | 'none' | 'bankrupt' | 'auction';
export type controlAuction = 'startAuction' | 'leaveAuction' | 'stepAuction' | 'endAuction';
export type cellType = 'company' | 'empty' | 'tax' | 'profit' | 'loss';
export type dealPerson = 'offerPerson' | 'receivePerson';
export type statePlayer = 'active' | 'wait' | 'inactive';
export type typeLoading = 'cell' | 'auction' | 'startGame' | 'endGame' | 'startAuction';
export type keyUpdatePlayer = 'total' | 'capital' | 'cellPosition' | 'prison' | 'bankrupt' | 'online';
export type fullPlayer = mainPlayer & extraPlayer;
export type offerInfo = {
    indexCompany: number[];
    valueMoney: number;
    idPerson: string;
}

export type offerDealInfo = {
    [key in dealPerson]: offerInfo;
}

export type updatePlayer = {
    [key in keyUpdatePlayer]: number;
} & { id: string }

export type mainPlayer = {
    id: string;
    nickName: string;
    image: string;
    color: string;
    numberGame: number;
    numberWin: number;
}

export type extraPlayer = {
    total: number;
    capital: number;
    cellPosition: number;
    prison: number;
    bankrupt: number;
    online: number;
}

export interface CompanyInfo {
    countryCompany: string;
    priceCompany: number;
    collateralCompany: number;
    buyBackCompany: number;
    priceStock: number;
    shares?: number;
    isPledge?: boolean;
    owned?: string;
    isMonopoly?: boolean;
    rentCompany?: number;
    rentCompanyInfo: number[];
}

export type gameCell = {
    type: cellType;
    location: location;
    indexCell: number;
    nameCell: string;
    company?: CompanyInfo;
}

export type updateCellCompany = {
    indexCell: number,
    company: {
        shares: number;
        isPledge: boolean;
        isMonopoly: boolean;
        owned?: string;
        rentCompany: number;
    }
}

export type playersGame = {
    [key: string]: fullPlayer
}

export type chatRoomPayload = { chat: chatMessage };

export type chatMessage = {
    message?: string;
    senderId?: string;
    idUser?: string;
    cellId?: number;
    valueroll?: number;
    action?: string
}

export type createUserDto = {
    nickName: string;
    password: string;
}

export type deleteUserDto = {
    nickname: string;
    password: string;
}

export type createRoomDto = {
    roomName: string;
    maxPlayers: number;
    timeTurn: number;
}

export type infoRoom = {
    maxPlayers: number,
    idRoom: string,
    roomName: string,
    isStart: Boolean,
    players: fullPlayer[],
    timeTurn: number
}

export interface ResponseAuth {
    accessToken: string;
}

export interface JwtPayload {
    id: string;
    nickName: string;
}

export type location = {
    gridArea: string,
    cellDirections: cellDirections,
}

export type infoCellTurn = {
    indexCompany: number;
    buttons: infoCellButtons;
    description: string;
    value?: number;
}

export type infoAuction = {
    currentPrice: number;
    currentPlayer: string;
    action: controlAuction;
    statePlayer: statePlayer;
    indexCompany: number;
}

export type updateUser = {
    userId: string;
    password: string;
    newNickName?: string;
    newPassword?: string;
    newAvatar?: string;
}