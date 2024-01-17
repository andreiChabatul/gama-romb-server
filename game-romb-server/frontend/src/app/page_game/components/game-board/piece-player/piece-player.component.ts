import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MAX_INDEX_CELL_BOARD } from 'src/app/const';
import { coorEndX, coorEndY, coorInitX, coorInitY, gridArea, stepX, stepY } from './const';
import { AudioServices } from 'src/app/shared/services/audio.services';

@Component({
  selector: 'app-piece-player',
  templateUrl: './piece-player.component.html',
  styleUrls: ['./piece-player.component.scss'],
  animations: [
    trigger('moveX', [
      state('X',
        style({
          left: '{{coorX}}vw',
        }), { params: { coorX: coorInitX } }),
      transition('* <=> X', animate('0.3s linear')),
    ]),
    trigger('moveY', [
      state('Y',
        style({
          top: '{{coorY}}vw',
        }), { params: { coorY: coorInitY } }),
      transition('* <=> Y', animate('0.3s linear')),
    ]),
    trigger('rotate', [
      state('deg0',
        style({
          transform: 'rotate(0)',
        })),
      state('deg90',
        style({
          transform: 'rotate(90deg)',
        })),
      transition('* <=> *', animate('0.3s linear')),
    ],
    ),
    trigger('moneyCircle', [
      state('on',
        style({
          opacity: 1,
          transform: 'scale(1) rotate(360deg)'
        })),
      state('off',
        style({
          opacity: 0,
          transform: 'scale(0) rotate(0)'
        })),
      transition('off <=> on', animate('1s 0.2s ease-in')),
    ],
    )
  ]

})
export class PiecePlayerComponent implements OnInit, OnChanges {

  @Input() cellPosition: number;
  @Input() index: number;
  @Input() prisonPlayer: number;
  @Input() color: string;
  changePosition: number;
  coorX: number;
  coorY: number;
  gridArea: string;
  moveX: 'X' | '';
  moveY: 'Y' | '';
  _rotate: 'deg0' | 'deg90';
  _animText: 'on' | 'off';
  isCircle: boolean;
  gridAreaCell = gridArea;

  constructor(private audioServices: AudioServices) { }

  ngOnInit(): void {
    [this.coorX, this.coorY, this.moveX, this.moveY, this._rotate, this.isCircle] =
      [coorInitX, coorInitY, '', '', 'deg0', false];
    this.gridArea = gridArea[this.index];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isCircle = true;
    for (let propName in changes) {
      if (propName === 'cellPosition') {
        this.cellPositionChange(changes[propName].previousValue)
      };
    };
  }

  cellPositionChange(prevPosition: number) {
    if (this.prisonPlayer) {
      [this.coorX, this.coorY, this.moveX, this.moveY] = [coorEndX, coorInitY, 'X', 'Y'];
      return;
    };
    this.changePosition = this.cellPosition - prevPosition;
    this.changePosition += (this.changePosition < 0) ? MAX_INDEX_CELL_BOARD : 0;
    this.step();
  }

  animEndX(): void {
    this.moveX = '';
    (this.coorX === coorEndX && this.coorY === coorInitY) ||
      (this.coorX === coorInitX && this.coorY === coorEndY)
      ? this._rotate = 'deg90'
      : '';
  }

  animEndY(): void {
    this.moveY = '';
    (this.coorY === coorEndY && this.coorX === coorEndX) ||
      (this.coorX === coorInitX && this.coorY === coorInitY)
      ? this._rotate = 'deg0'
      : '';
  }

  animEndText(): void {
    this._animText = 'off';
  }

  animRotateEnd(): void {
    this._animText = (this.coorX === coorInitX && this.coorY === coorInitY && this.isCircle) ? 'on' : 'off';
    this.step();
  }

  step(): void {
    if (!this.prisonPlayer) {
      this.audioServices.playAudioSpec('pieceMove');
      if (this.coorX < coorEndX && this.coorY === coorInitY) {
        this.moveRight();
      }
      else if (this.coorX === coorEndX && this.coorY < coorEndY) {
        this.moveDown();
      }
      else if (this.coorX > coorInitX && this.coorY === coorEndY) {
        this.moveLeft();
      }
      else if (this.coorX === coorInitX && this.coorY > coorInitY) {
        this.moveTop();
      };
    }
  }

  moveRight(): void {
    while (this.changePosition > 0 && this.coorX !== coorEndX) {
      this.changePosition -= 1;
      (this.coorX === coorInitX) ? this.coorX += stepX / 2 : '';
      const newCoorX = this.coorX + stepX;
      ((newCoorX + coorInitX) < coorEndX)
        ? this.coorX = newCoorX
        : this.coorX = coorEndX;
    }
    this.moveX = 'X';
  }

  moveLeft(): void {
    while (this.changePosition > 0 && this.coorX !== coorInitX) {
      this.changePosition -= 1;
      (this.coorX === coorEndX) ? this.coorX -= stepX / 2 : '';
      const newCoorX = this.coorX - stepX;
      ((newCoorX - (stepX / 2)) > coorInitX)
        ? this.coorX = newCoorX
        : this.coorX = coorInitX;
    }
    this.moveX = 'X';
  }

  moveDown(): void {
    while (this.changePosition > 0 && this.coorY !== coorEndY) {
      this.changePosition -= 1;
      (this.coorY === coorInitY) ? this.coorY += stepY / 2 : '';
      const newCoorY = this.coorY + stepY;
      ((newCoorY + (stepY / 2)) < coorEndY)
        ? this.coorY = newCoorY
        : this.coorY = coorEndY;
    }
    this.moveY = 'Y';
  }

  moveTop(): void {
    while (this.changePosition > 0 && this.coorY !== coorInitY) {
      this.changePosition -= 1;
      (this.coorY === coorEndY) ? this.coorY -= stepY / 2 : '';
      const newCoorY = this.coorY - stepY;
      (newCoorY - (stepY / 2) > coorInitY)
        ? this.coorY = newCoorY
        : this.coorY = coorInitY;
    }
    this.moveY = 'Y';
  }

}
