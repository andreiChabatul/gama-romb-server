import { ChatMessageEffects } from "./chat.message";
import { CloseModalEffects } from "./close.modal.effects";
import { InsideBoardEffects } from "./insideBoard.effects";
import { OpenModalEffects } from "./open.reconnect.effects";
import { TurnEffects } from "./turn.effects";
import { UpdateUsersEffects } from "./update.user.effects";

export const EFFECTS = [
    TurnEffects,
    UpdateUsersEffects,
    CloseModalEffects,
    OpenModalEffects,
    InsideBoardEffects,
    ChatMessageEffects];