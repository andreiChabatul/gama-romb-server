import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import * as gameActions from '../actions/gameActions';
import { AudioServices } from "src/app/shared/services/audio.services";

@Injectable()
export class ChatMessageEffects {
    update$ = createEffect(
        () => this.actionUnion$.pipe(
            ofType(gameActions.UpdateChatRoom),
            tap((payload) => payload.chatMessage.message ? this.audioServices.playAudioSpec('chatMessage') : '')),
        { dispatch: false }
    );

    constructor(private actionUnion$: Actions, private audioServices: AudioServices) { }
}
