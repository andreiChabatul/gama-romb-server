import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { Button, InputTextFormOption } from 'src/app/types/components';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-modal-delete-profile',
  templateUrl: './modal-delete-profile.component.html',
  styleUrls: ['./modal-delete-profile.component.scss']
})
export class ModalDeleteProfileComponent {

  deleteButton: Button = { action: ACTIONS_BUTTON.DELETE_PROFILE, width: '20vw' };
  deleteProfile: FormGroup;
  inputForm: InputTextFormOption[] = [
    { nameForm: 'nickname', type: 'text' },
    { nameForm: 'password', type: 'password' },
  ];

  constructor(private fb: FormBuilder, private userService: UsersService) {
    this.createForm();
  }

  private createForm(): void {
    this.deleteProfile = this.fb.group({});
  }

  onSubmit(): void {
    if (this.deleteProfile.invalid) {
      this.deleteProfile.markAllAsTouched()
      return;
    }
    this.userService.deleteUser({
      password: this.deleteProfile.value.password.value,
      nickname: this.deleteProfile.value.nickname.value,
    })
  }
}
