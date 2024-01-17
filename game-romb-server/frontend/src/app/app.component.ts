import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.authService.refresh();
    const lang = localStorage.getItem('langMonopoly');
    lang ? this.translocoService.setActiveLang(lang) : '';
  }

}
