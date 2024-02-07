import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-yandex-auth',
  templateUrl: './yandex-auth.component.html',
  styleUrls: ['./yandex-auth.component.scss']
})
export class YandexAuthComponent {

  @Input() size: string;


  authYandex(): void {
    window.location.href = 'https://api.game-monopoly.ru/auth/yandex'
  }
}
