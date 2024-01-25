import { Component, Input } from '@angular/core';
import { infoCellTurn } from 'src/app/types';

@Component({
  selector: 'app-cell-empty',
  templateUrl: './cell-empty.component.html',
  styleUrls: ['./cell-empty.component.scss']
})
export class CellEmptyComponent {

  @Input() infoCellTurn: infoCellTurn;

}