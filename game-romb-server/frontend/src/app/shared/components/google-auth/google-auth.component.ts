import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent {

  @Input() size: string;

  authGoogle(): void {
    window.location.href = 'http://5.35.99.249:3000/auth/google'
  }

}
