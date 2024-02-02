import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as userActions from '../actions/userActions';
import * as modalActions from '../actions/modalActions';
import * as gameActions from '../actions/gameActions';

@Injectable()
export class CloseModalEffects {
    update$ = createEffect(
        () => this.actionUnion$.pipe(
            ofType(...[userActions.loginUser, userActions.logoutUser, gameActions.StartGame]),
            map(() => modalActions.closeModal())
        ));

    constructor(private actionUnion$: Actions) { }
}
