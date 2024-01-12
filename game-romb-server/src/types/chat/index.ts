import { controlAuction } from "..";

export interface ChatI {
    readonly messagesChat: messagesChat;
    addChatMessage(idRoom: string, chatMessage: chatMessage): void;
    getAllMessages(idRoom: string): chatMessage[];
}

export type messagesChat = {
    [idRoom: string]: chatMessage[]
}

export type chatMessage = {
    message?: string;
    senderId?: string;
    action?: EMESSAGE_CLIENT | controlAuction,
    idUser?: string,
    cellId?: number,
    valueroll?: number,
}

export enum EMESSAGE_CLIENT {
    FIRST_TURN = 'firstTurn',
    TURN = "turn",
    DOUBLE_TURN = "doubleTurn",
    DOUBLE_TURN_PRISON = "doubleTurnPrison",
    INTO_CELL = "intoCell",
    INFO_CELL_BUY_COMPANY = "infoCellbuyCompany",
    ADD_TOTAL = 'addTotal',
    MINUS_TOTAL = 'minusTotal',
    MINUS_TOTAL_BUY_COMPANY = 'minusTotalBuyCompany',
    MINUS_TOTAL_PAY_DEBT = 'minusTotalPayDebt',
    MINUS_TOTAL_PAY_RENT = 'minusTotalPayRent',
    MINUS_TOTAL_PAY_PRISON = 'minusTotalPayPrison',
    OWNED_COMPANY = 'ownedCompanyInfo',
    PLEDGE_COMPANY = 'pledgeCompanyInfo',
    RENT_COMPANY = 'rentCompanyInfo',
    BUY_COMPANY = 'buyCompanyInfo',
    AUCTION_COMPANY = 'auctionCompanyInfo',
    REFUSE_DEAL = 'refuseDealInfo',
    ACCEPT_DEAL = 'acceptDealInfo',
    LEAVE_PRISON = 'leavePrison',
    GET_IN_PRISON = 'getInPrison',
}