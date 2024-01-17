import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as gameActions from '../actions/gameActions';

@Injectable()
export class InsideBoardEffects {
    update$ = createEffect(
        () => this.actionUnion$.pipe(
            ofType(...[
                gameActions.EndGame,
                gameActions.InfoAuction,
                gameActions.SetOfferDealInfo,
                gameActions.UpdateInfoCellTurn]),
            map((action) => {
                switch (action.type) {
                    case gameActions.gameActionsTypes.EndGame:
                        return gameActions.ControlInsideBoard({ insideBoardState: 'winner' });
                    case gameActions.gameActionsTypes.InfoAuction:
                        return gameActions.ControlInsideBoard({ insideBoardState: 'auction' });
                    case gameActions.gameActionsTypes.SetOfferDealInfo:
                        return gameActions.ControlInsideBoard({ insideBoardState: 'receiveDeal' });
                    case gameActions.gameActionsTypes.UpdateInfoCellTurn:
                        return gameActions.ControlInsideBoard({ insideBoardState: 'infoCellTurn' });
                }
            })
        ));

    constructor(private actionUnion$: Actions) { }
}
