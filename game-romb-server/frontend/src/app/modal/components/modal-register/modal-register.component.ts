import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/auth/auth.service';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { ButtonStandart, InputTextFormOption } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { OpenModal } from 'src/store/actions/modalActions';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalRegisterComponent {

  inputForm: InputTextFormOption[] = [
    { nameForm: 'nickname', type: 'text' },
    { nameForm: 'password', type: 'password' }
  ]
  registerForm: FormGroup;
  textButton: ButtonStandart = { action: ACTIONS_BUTTON.REGISTER, height: '4vw', width: '17vw' };

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStore>,
    private authService: AuthService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.registerForm = this.fb.group({});
  }

  loginOpen() {
    this.store.dispatch(OpenModal({ payload: { modalState: 'logInProfile' } }));
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched()
      return;
    }
    this.authService.register({
      nickName: this.registerForm.value.nickname.value,
      password: this.registerForm.value.password.value
    })
  }

}
