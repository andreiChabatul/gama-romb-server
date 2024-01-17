import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-info-player-balanse',
  templateUrl: './info-player-balanse.component.html',
  styleUrls: ['./info-player-balanse.component.scss']
})
export class InfoPlayerBalanseComponent implements OnChanges {

  @Input() prevValue: number;
  @Input() currValue: number;
  value: number;
  color: string;

  ngOnChanges(): void {
    const difference = this.currValue - this.prevValue;
    this.value = this.prevValue;
    if (Math.abs(difference) > 0) {
      const timer = setInterval(() => {
        this.setColor(difference);
        const newValue = this.value + Math.floor(difference / 15);
        if (difference > 0 && newValue > this.currValue ||
          difference < 0 && newValue < this.currValue) {
          this.color = '#002260';
          this.value = this.currValue;
          clearInterval(timer);
        } else {
          this.value = newValue;
        }
      }, 0);
    }
  }

  setColor(difference: number): void {
    if (difference > 0) {
      this.color = '#9D6D25';
    } else if (difference < 0) {
      this.color = '#E20001';
    }
  }

}
