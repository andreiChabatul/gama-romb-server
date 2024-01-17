import { Component, Input } from '@angular/core';
import { infoCellTurn } from 'src/app/types';

@Component({
  selector: 'app-cell-company',
  templateUrl: './cell-company.component.html',
  styleUrls: ['./cell-company.component.scss']
})
export class CellCompanyComponent {

  @Input() infoCellTurn: infoCellTurn | undefined | null;

}
