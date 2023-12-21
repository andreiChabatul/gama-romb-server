import { Injectable } from "@nestjs/common";
import { RoomsService } from "src/rooms/rooms.services";
import { ContorolCompanyPayload, ControlAuctionPayload, ControlRoomPayload, DiceRollGamePayload, EACTION_WEBSOCKET, MessageChatGamePayload, OfferDealPayload, StateGamePayload, myWebSocket, payloadSocket } from "src/types/websocket";

@Injectable()
export class AppGateWayController {

    constructor(private roomsService: RoomsService) { }

    handleMessage(client: myWebSocket, [action, data]: payloadSocket) {
        const { idRoom, idUser } = data;
        const room = this.roomsService.getRoom(idRoom);
        if (room && idUser) {
            switch (action) {

                case EACTION_WEBSOCKET.CONTROL_ROOM:
                    this.roomsService.controlRoom(data as ControlRoomPayload, client);
                    break;

                case EACTION_WEBSOCKET.UPDATE_CHAT:
                    room.addChatMessage(data as MessageChatGamePayload);
                    break;

                case EACTION_WEBSOCKET.DICE_ROLL:
                    room.playerMove(data as DiceRollGamePayload);
                    break;

                case EACTION_WEBSOCKET.ACTIVE_CELL:
                    room.activeCell(idUser);
                    break;

                case EACTION_WEBSOCKET.CONTROL_COMPANY:
                    room.controlCompany(data as ContorolCompanyPayload);
                    break;

                case EACTION_WEBSOCKET.CONTROL_DEAL:
                    room.controlDeal(data as OfferDealPayload);
                    break;

                case EACTION_WEBSOCKET.AUCTION:
                    room.controlAuction(data as ControlAuctionPayload);
                    break;

                case EACTION_WEBSOCKET.END_GAME:
                    room.stateGame(data as StateGamePayload);
                    break;

                case EACTION_WEBSOCKET.RECONNECT:
                    this.roomsService.reconnectPlayer(idRoom, idUser, client);
                    break;

                default:
                    break;
            }
        }
    }
}
