import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import * as userActions from '../actions/userActions';
import * as modalActions from '../actions/modalActions';

@Injectable()
export class UpdateUsersEffects {
    update$ = createEffect(
        () => this.actionUnion$.pipe(
            ofType(userActions.UpdateUser),
            map(() => modalActions.AddModalInfo({ modalError: 'User update' })))
    );
    
    constructor(private actionUnion$: Actions) { }
}
