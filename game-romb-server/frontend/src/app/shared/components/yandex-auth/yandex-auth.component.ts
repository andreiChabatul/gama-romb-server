import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-yandex-auth',
  templateUrl: './yandex-auth.component.html',
  styleUrls: ['./yandex-auth.component.scss']
})
export class YandexAuthComponent {

  @Input() size: string;


  authYandex(): void {
    window.location.href = 'http://5.35.99.249:3000/auth/yandex'
  }
}
