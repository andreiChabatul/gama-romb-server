import { Component, Input } from '@angular/core';
import { infoCellTurn } from 'src/app/types';

@Component({
  selector: 'app-cell-tax',
  templateUrl: './cell-tax.component.html',
  styleUrls: ['./cell-tax.component.scss']
})
export class CellTaxComponent {

  @Input() infoCellTurn: infoCellTurn;

}
