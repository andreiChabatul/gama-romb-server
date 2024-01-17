import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnChanges {

  @Input() side: number;
  indexs = [0, 1, 2, 3, 4, 5];
  classShow: string;

  ngOnChanges() {
    this.classShow = 'show-' + this.side;
  }
  
}
