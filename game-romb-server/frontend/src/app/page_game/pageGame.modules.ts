import { NgModule } from '@angular/core';
import { PageGameComponent } from './pages/page-game/page-game.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { InfoPlayerComponent } from './components/info-player/info-player.component';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { SharedModule } from '../shared/shared.module';
import { PageGameRoutingModule } from './page.game.routing.module';
import { CommonModule } from '@angular/common';
import { GameCellComponent } from './components/cell/game-cell/game-cell.component';
import { GameCellCompanyComponent } from './components/cell/game-cell-company/game-cell-company.component';
import { GameCellSquareComponent } from './components/cell/game-cell-square/game-cell-square.component';
import { ChatGameComponent } from './components/chat/chat-game/chat-game.component';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';
import { ChatInputComponent } from './components/chat/chat-input/chat-input.component';
import { DiceRollComponent } from './components/dices/dice-roll/dice-roll.component';
import { DiceComponent } from './components/dices/dice/dice.component';
import { DiceSideComponent } from './components/dices/dice-side/dice-side.component';
import { InfoCellTurnComponent } from './components/insideGameBoard/info-cell-turn/info-cell-turn.component';
import { GameBoardTurnComponent } from './components/insideGameBoard/game-board-turn/game-board-turn.component';
import { StartTurnButtonsComponent } from './components/insideGameBoard/start-turn-buttons/start-turn-buttons.component';
import { PlayerInfoInsideComponent } from './components/insideGameBoard/player-info-inside/player-info-inside.component';
import { ControlCompanyComponent } from './components/insideGameBoard/control-company/control-company.component';
import { PrisonPlayerComponent } from './components/insideGameBoard/prison-player/prison-player.component';
import { OfferDealComponent } from './components/insideGameBoard/offer-deal-turn/offer-deal/offer-deal.component';
import { OfferDealItemComponent } from './components/insideGameBoard/offer-deal-turn/offer-deal-item/offer-deal-item.component';
import { ReceiveDealComponent } from './components/insideGameBoard/offer-deal-turn/receive-deal/receive-deal.component';
import { ReceiveDealItemComponent } from './components/insideGameBoard/offer-deal-turn/receive-deal-item/receive-deal-item.component';
import { InfoPlayerBalanseComponent } from './components/info-player/info-player-balanse/info-player-balanse.component';
import { PiecePlayerComponent } from './components/game-board/piece-player/piece-player.component';
import { CellTaxComponent } from './components/insideGameBoard/cell-tax/cell-tax.component';
import { CellProfitComponent } from './components/insideGameBoard/cell-profit/cell-profit.component';
import { CellLossComponent } from './components/insideGameBoard/cell-loss/cell-loss.component';
import { CellEmptyComponent } from './components/insideGameBoard/cell-empty/cell-empty.component';
import { CellCompanyComponent } from './components/insideGameBoard/cell-company/cell-company.component';
import { AuctionCompanyComponent } from './components/insideGameBoard/auction-company/auction-company.component';
import { EnoughMoneyComponent } from './components/insideGameBoard/enough-money/enough-money.component';
import { WinnerGameComponent } from './components/insideGameBoard/winner-game/winner-game.component';
import { TurnTimerComponent } from './components/insideGameBoard/turn-timer/turn-timer.component';

@NgModule({
    declarations: [
        PageGameComponent,
        GameBoardComponent,
        InfoPlayerComponent,
        ChatGameComponent,
        ChatMessageComponent,
        ChatInputComponent,
        GameBoardComponent,
        GameCellComponent,
        GameCellCompanyComponent,
        GameCellSquareComponent,
        DiceRollComponent,
        DiceComponent,
        DiceSideComponent,
        InfoCellTurnComponent,
        GameBoardTurnComponent,
        StartTurnButtonsComponent,
        PlayerInfoInsideComponent,
        ControlCompanyComponent,
        PrisonPlayerComponent,
        OfferDealComponent,
        OfferDealItemComponent,
        ReceiveDealComponent,
        ReceiveDealItemComponent,
        InfoPlayerBalanseComponent,
        PiecePlayerComponent,
        CellTaxComponent,
        CellProfitComponent,
        CellLossComponent,
        CellEmptyComponent,
        CellCompanyComponent,
        AuctionCompanyComponent,
        EnoughMoneyComponent,
        WinnerGameComponent,
        TurnTimerComponent
    ],
    imports: [
        SharedModule,
        MaterialsModule,
        CommonModule
    ],
    exports: [PageGameRoutingModule],
    providers: [],
    bootstrap: []
})
export class PageGameModule { }
