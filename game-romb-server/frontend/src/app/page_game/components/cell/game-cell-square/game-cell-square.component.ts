import { Component, Input } from '@angular/core';
import { gameCell } from 'src/app/types';

@Component({
  selector: 'app-game-cell-square',
  templateUrl: './game-cell-square.component.html',
  styleUrls: ['./game-cell-square.component.scss']
})
export class GameCellSquareComponent {

  @Input() gameCell: gameCell;

}
