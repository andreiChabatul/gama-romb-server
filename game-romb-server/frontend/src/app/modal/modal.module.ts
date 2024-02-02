import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalEditProfileComponent } from './components/modal-edit-profile/modal-edit-profile.component';
import { ModalExitGameComponent } from './components/modal-exit-game/modal-exit-game.component';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { ModalRegisterComponent } from './components/modal-register/modal-register.component';
import { ModalJoinGameComponent } from './components/modal-join-game/modal-join-game.component';
import { ModalInfoCellComponent } from './components/modal-info-cell/modal-info-cell.component';
import { ReconnectModalComponent } from './components/reconnect-modal/reconnect-modal.component';
import { CreateGameFormComponent } from './components/create-game-form/create-game-form.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialsModule } from '../materials/materials.module';
import { TranslocoRootModule } from '../transloco-root.module';
import { ModalDeleteProfileComponent } from './components/modal-delete-profile/modal-delete-profile.component';
import { ModalDemoComponent } from './components/modal-demo/modal-demo.component';

@NgModule({
  declarations: [
    ModalComponent,
    ModalEditProfileComponent,
    ModalExitGameComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    ModalJoinGameComponent,
    ModalInfoCellComponent,
    ReconnectModalComponent,
    CreateGameFormComponent,
    ModalDeleteProfileComponent,
    ModalDemoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialsModule,
    TranslocoRootModule
  ],
  exports: [ModalComponent]
})
export class ModalModule { }
