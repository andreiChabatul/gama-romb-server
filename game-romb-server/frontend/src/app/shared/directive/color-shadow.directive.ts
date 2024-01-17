import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { COLOR_PLAYER_DEFAULT } from 'src/app/const';
import { cellDirections } from 'src/app/types';
import { AppStore } from 'src/app/types/state';
import { selectGameRoom } from 'src/store/selectors';

@Directive({
    selector: '[appColorShadow]'
})
export class ColorShadowDirective implements OnChanges {

    @Input() playerId: string | undefined;
    @Input() directtion: cellDirections;
    colorShadow: string;
    gameRoom$ = this.store.select(selectGameRoom);

    constructor(private el: ElementRef, private store: Store<AppStore>) { }

    ngOnChanges(): void {

        this.gameRoom$.subscribe((gameRoom) =>
            (this.playerId && gameRoom.players[this.playerId])
                ? this.colorShadow = gameRoom.players[this.playerId].color
                : this.colorShadow = COLOR_PLAYER_DEFAULT
        );

        this.directtion === 'left' || this.directtion === 'right'
            ? this.el.nativeElement.style.boxShadow = `34px 0px 52px -30px ${this.colorShadow} inset`
            : this.el.nativeElement.style.boxShadow = `0px -34px 52px -30px ${this.colorShadow} inset`
    }
}