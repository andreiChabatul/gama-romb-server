import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice-side',
  templateUrl: './dice-side.component.html',
  styleUrls: ['./dice-side.component.scss']
})
export class DiceSideComponent {

  @Input() index: number;

}
