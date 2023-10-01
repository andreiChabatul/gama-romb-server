export enum EACTION_WEBSOCKET {
    CREATE_GAME = 'create game',
    LIST_ROOM = 'list room',
    JOIN_GAME = 'join game',
    MESSAGE_CHAT = 'message chat',
    UPDATE_PLAYER = 'update player',
    UPDATE_CHAT = 'update chat',
    DICE_ROLL = 'dice roll',
    BUY_COMPANY = 'buy company',
    START_AUCTION = 'start auction',
    AUCTION_STEP = 'auction step',
    AUCTION_LEAVE = 'auction leave',
    BUY_STOCK = 'buy stock',
    INFO_CELL_TURN = 'info cell turn',
    END_TURN = 'end turn',
    PAY_DEBT = 'pay debt',
    UPDATE_CELL = 'update cell',
    START_GAME = 'start game',
    INIT_PLAYER = 'init player',
}

export interface payloadSocket {
    action: EACTION_WEBSOCKET,
    payload: {}
}

export interface DefaultPayload {
    idRoom: string;
    idUser: string;
}

export interface PayloadJoinGame extends DefaultPayload {
    idRoomJoin: string;
}

export interface MessageChatGamePayload extends DefaultPayload {
    message: string;
}

export interface DiceRollGamePayload extends DefaultPayload {
    value: number;
    isDouble: boolean;
}

export interface BuyCompanyPayload extends DefaultPayload {
    indexCompany: number;
}

export interface PayDebtPayload extends DefaultPayload {
    debtValue: number;
    receiverId?: string;
}
