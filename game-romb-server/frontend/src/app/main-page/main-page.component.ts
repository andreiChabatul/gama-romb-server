import { Component, OnDestroy, OnInit } from '@angular/core';
import { ACTIONS_BUTTON } from '../const/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Button } from '../types/components';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  subscription$: Subscription;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  buttons: Button[] = [
    { action: ACTIONS_BUTTON.NEW_GAME, width: '18vw' },
    { action: ACTIONS_BUTTON.JOIN_GAME, width: '18vw' }
  ];

  ngOnInit(): void {
    this.subscription$ = this.route.queryParams.subscribe((query) => {
      const accessToken: string = query['accessToken'];
      accessToken ? this.authService.setToken({ accessToken }) : '';
    });
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
