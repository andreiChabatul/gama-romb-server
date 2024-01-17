import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-anonim-auth',
  templateUrl: './anonim-auth.component.html',
  styleUrls: ['./anonim-auth.component.scss']
})
export class AnonimAuthComponent {


  @Input() size: string;

  constructor(private authService: AuthService) { }

  authAnonim(): void {
    this.authService.register({
      nickName: 'anonim_' + Date.now(),
      password: '12345678'
    });
  };
}
