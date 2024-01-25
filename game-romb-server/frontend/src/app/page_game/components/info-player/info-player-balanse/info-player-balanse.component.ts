import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-info-player-balanse',
  templateUrl: './info-player-balanse.component.html',
  styleUrls: ['./info-player-balanse.component.scss']
})
export class InfoPlayerBalanseComponent implements OnChanges {

  @Input() valueActual: number | string;
  value: number;
  color: string;

  ngOnChanges(changes: SimpleChanges): void {
    let previousValue = 0;
    let currentValue = Number(this.valueActual);

    for (const propName in changes) {
      const chng = changes[propName];
      previousValue = chng.previousValue || 0;
    };

    const difference = currentValue - previousValue;
    this.value = previousValue;
    if (Math.abs(difference) > 0) {
      const timer = setInterval(() => {
        this.color = this.setColor(difference);
        const newValue = this.value + Math.floor(difference / 50);
        if (difference > 0 && newValue > currentValue ||
          difference < 0 && newValue < currentValue) {
          this.color = '#002260';
          this.value = currentValue;
          clearInterval(timer);
        } else {
          this.value = newValue;
        }
      }, 0);
    }
  }

  setColor(difference: number): string {
    return (difference > 0) ? '#9D6D25' : '#E20001';
  }

}
