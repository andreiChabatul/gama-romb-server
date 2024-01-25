import { Component, Input } from '@angular/core';
import { infoCellTurn } from 'src/app/types';


@Component({
  selector: 'app-cell-loss',
  templateUrl: './cell-loss.component.html',
  styleUrls: ['./cell-loss.component.scss']
})
export class CellLossComponent {

  @Input() infoCellTurn: infoCellTurn;

}