import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AUDIO_SRC, STANDART_VOLUME } from 'src/app/const';
import { fullPlayer } from 'src/app/types';
import { eventAudio } from 'src/app/types/audioServices';
import { AppStore } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

@Injectable({
    providedIn: 'root'
})
export class AudioServices {

    audio: HTMLAudioElement = new Audio();
    src: eventAudio;
    gamePlayer$ = this.store.select(selectGamePlayer);
    gamePlayer: fullPlayer | null;
    private _volume: number;

    constructor(private store: Store<AppStore>) {
        this.gamePlayer$.subscribe((gamePlayer) => this.gamePlayer = gamePlayer);
    }

    playAudioSpec(eventAudio: eventAudio): void {
        this.src = eventAudio;
        this.playAudio();
    }

    playAudioEmpty(): void {
        switch (this.gamePlayer?.cellPosition) {
            case 0:
            case 5:
            case 24:
                this.src = 'profit';
                this.playAudio();
                break;
            case 12:
            case 19:
                this.src = 'emptyCell';
                this.playAudio();
                break;
        }
    }

    playAudio(): void {
        this.audio.volume = this.volume / 100;
        this.audio.src = `${AUDIO_SRC}${this.src}.mp3`;
        this.audio.load();
        this.audio.play();
    }

    stopAudio(): void {
        this.audio.pause();
    }

    set volume(value: number) {
        this._volume = value;
        localStorage.setItem('volumeMonopoly', String(this._volume));
    }

    get volume(): number {
        const volumeLC = localStorage.getItem('volumeMonopoly');
        this._volume = Number(volumeLC ? volumeLC : STANDART_VOLUME);
        return this._volume;
    }

}
