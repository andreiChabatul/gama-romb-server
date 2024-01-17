import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent {

  @Input() size: string;

  authGoogle(): void {
    window.location.href = 'http://localhost:3000/auth/google'
  }

}
