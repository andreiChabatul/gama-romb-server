import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStore } from 'src/app/types/state';
import { selectGamePlayer } from 'src/store/selectors';

@Component({
  selector: 'app-enough-money',
  templateUrl: './enough-money.component.html',
  styleUrls: ['./enough-money.component.scss']
})
export class EnoughMoneyComponent implements OnChanges, OnDestroy {

  @Input() value: number | undefined;
  gamePlayer$ = this.store.select(selectGamePlayer);
  resultStr: string;
  subscription$: Subscription;

  constructor(private store: Store<AppStore>) { }

  ngOnChanges(): void {
    this.subscription$ = this.gamePlayer$.subscribe(((player) => {
      if (player) {
        if (player.bankrupt) {
          this.resultStr = 'playerBankrupt'
        } else if (player.total > Number(this.value)) {
          this.resultStr = 'enoughMoney'
        } else {
          this.resultStr = 'noEnoughMoney'
        }
      }
    }
    ));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
