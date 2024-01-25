import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { Store } from "@ngrx/store";
import { AppStore } from 'src/app/types/state';
import { selectUser } from "../selectors";
import * as gameActions from '../actions/gameActions';

@Injectable()
export class TurnEffects {
    turn$ = createEffect(
        () => this.actionUnion$.pipe(
            ofType(gameActions.UpdateTurn),
            switchMap((action) => this.user$.pipe(
                map((user) => {
                    this.store.dispatch(gameActions.ControlCompanyClear())
                    return (user.infoUser?.id === action.turnId)
                        ? gameActions.ControlInsideBoard({ insideBoardState: 'startButtons' })
                        : gameActions.ControlInsideBoard({ insideBoardState: 'playerInfo' })
                })
            ))
        )
    );

    constructor(private actionUnion$: Actions, private store: Store<AppStore>) { }
    user$ = this.store.select(selectUser);
}
