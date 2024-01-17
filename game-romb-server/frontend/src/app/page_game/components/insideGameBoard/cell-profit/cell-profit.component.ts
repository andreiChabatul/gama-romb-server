import { Component, Input } from '@angular/core';
import { infoCellTurn } from 'src/app/types';

@Component({
  selector: 'app-cell-profit',
  templateUrl: './cell-profit.component.html',
  styleUrls: ['./cell-profit.component.scss']
})
export class CellProfitComponent {

  @Input() infoCellTurn: infoCellTurn | undefined | null;

}