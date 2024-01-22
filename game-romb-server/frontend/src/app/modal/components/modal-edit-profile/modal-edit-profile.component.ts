import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { ButtonStandart, InputTextFormOption } from 'src/app/types/components';
import { AppStore, infoUser } from 'src/app/types/state';
import { UsersService } from 'src/app/users/users.service';
import { selectInfoUser } from 'src/store/selectors';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalEditProfileComponent implements OnInit, OnDestroy {

  infoUser$ = this.store.select(selectInfoUser);
  infoUser: infoUser | undefined;
  subscription$: Subscription;
  subscriptionInput$: Subscription;
  editProfile: FormGroup;
  inputForm: InputTextFormOption[];
  saveButton: ButtonStandart = { action: ACTIONS_BUTTON.EDIT_PROFILE, height: '3.5vw', width: '20vw' };
  avatar: string;

  constructor(private fb: FormBuilder, private store: Store<AppStore>, private userService: UsersService) {
    this.createForm();
  }

  private createForm(): void {
    this.editProfile = this.fb.group({});
  }

  ngOnInit(): void {
    this.subscription$ = this.infoUser$.subscribe((infoUser) => this.infoUser = infoUser);
    if (this.infoUser) {
      this.inputForm = [
        { nameForm: 'newNickName', type: 'text', defaultValue: this.infoUser.nickName },
        { nameForm: 'newPassword', type: 'password', defaultValue: '*******' },
        { nameForm: 'oldPassword', type: 'password' }
      ];
      this.avatar = this.infoUser.image;
    }
  }

  inputFileAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.subscriptionInput$ = this.convertFile(input.files[0]).subscribe((newAvatar) => {
        this.avatar = newAvatar;
      });
    }
  }

  convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => result.next(reader.result ? btoa(reader.result.toString()) : '');
    return result;
  }

  onSubmit(): void {
    if (this.editProfile.invalid) {
      this.editProfile.markAllAsTouched()
      return;
    }
    this.userService.updateUser({
      userId: String(this.infoUser?.id),
      password: this.editProfile.value.oldPassword.value,
      newPassword: this.editProfile.value.newPassword.value,
      newNickName: this.editProfile.value.newNickName.value,
      newAvatar: this.avatar
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.subscriptionInput$ ? this.subscriptionInput$.unsubscribe() : '';
  }

}
