import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as modalActions from '../actions/modalActions';
import * as roomsActions from '../actions/roomsActions';

@Injectable()
export class OpenModalEffects {
    update$ = createEffect(
        () => this.actionUnion$.pipe(
            ofType(roomsActions.ReconnectRoom),
            map(() => modalActions.OpenModal({ payload: { modalState: 'reconnectGame' } }))
        ));

    constructor(private actionUnion$: Actions) { }
}
