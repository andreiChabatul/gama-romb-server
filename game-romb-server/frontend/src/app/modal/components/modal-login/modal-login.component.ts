import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { ButtonStandart, InputTextFormOption } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { OpenModal } from 'src/store/actions/modalActions';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent {
  inputForm: InputTextFormOption[] = [
    { nameForm: 'nickname', type: 'text' },
    { nameForm: 'password', type: 'password' }
  ]
  loginForm: FormGroup;
  textButton: ButtonStandart = { action: ACTIONS_BUTTON.LOGIN, height: '4vw', width: '17vw' };

  constructor(private fb: FormBuilder, private store: Store<AppStore>, private authService: AuthService) {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({});
  }

  registerOpen(): void {
    this.store.dispatch(OpenModal({ payload: { modalState: 'register' } }));
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return;
    }
    this.authService.login({
      nickName: this.loginForm.value.nickname.value,
      password: this.loginForm.value.password.value
    })
  }
}
