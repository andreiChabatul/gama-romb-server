import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  isShow: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) =>
      (event instanceof NavigationStart)
        ? this.isShow = event.url !== '/game'
        : ''
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
