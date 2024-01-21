import { Component } from '@angular/core';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrl: './page-about.component.scss'
})
export class PageAboutComponent {

  contacts = [
    { ico: 'icoVK', href: 'https://vk.com/smorgon_komp' },
    { ico: 'icoGM', href: 'mailto:andreichabatul@gmail.com' },
    { ico: 'icoTel', href: 'https://t.me/andrey_nanov' }
  ]
}
