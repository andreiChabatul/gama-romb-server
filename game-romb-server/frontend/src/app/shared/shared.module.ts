import { NgModule } from '@angular/core';
import { ButtonStandartComponent } from './components/button-standart/button-standart.component';
import { ButtonMaterialsComponent } from './components/button-materials/button-materials.component';
import { MaterialsModule } from '../materials/materials.module';
import { CommonModule } from '@angular/common';
import { ButtonControllerService } from './services/button-controller.service';
import { ColorShadowDirective } from './directive/color-shadow.directive';
import { ImgAssetsPipe } from './pipe/img-assets.pipe';
import { StockAssetsPipe } from './pipe/stock.assets.pipe';
import { RentPipe } from './pipe/rent.pipe';
import { TranslocoRootModule } from '../transloco-root.module';
import { ChangeMessagePipe } from './pipe/change.message.pipe';
import { RaitingStarsComponent } from './components/raiting-stars/raiting-stars.component';
import { FotoPlayerComponent } from './components/foto-player/foto-player.component';
import { LoaderTimeComponent } from './components/loader-time/loader-time.component';
import { MenuComponent } from './components/menu/menu.component';
import { GoogleAuthComponent } from './components/google-auth/google-auth.component';
import { YandexAuthComponent } from './components/yandex-auth/yandex-auth.component';
import { AnonimAuthComponent } from './components/anonim-auth/anonim-auth.component';
import { AvatarImagePipe } from './pipe/avatar.pipe';
import { AudioServices } from './services/audio.services';
import { VolumeImagePipe } from './pipe/volume.pipe';

@NgModule({
    declarations: [
        ButtonStandartComponent,
        ButtonMaterialsComponent,
        ColorShadowDirective,
        ImgAssetsPipe,
        StockAssetsPipe,
        RentPipe,
        ChangeMessagePipe,
        RaitingStarsComponent,
        FotoPlayerComponent,
        LoaderTimeComponent,
        MenuComponent,
        GoogleAuthComponent,
        YandexAuthComponent,
        AnonimAuthComponent,
        AvatarImagePipe,
        VolumeImagePipe
    ],
    imports: [
        CommonModule, MaterialsModule, TranslocoRootModule

    ],
    exports: [
        ButtonStandartComponent,
        ButtonMaterialsComponent,
        ColorShadowDirective,
        ImgAssetsPipe,
        StockAssetsPipe,
        RentPipe,
        TranslocoRootModule,
        ChangeMessagePipe,
        RaitingStarsComponent,
        FotoPlayerComponent,
        LoaderTimeComponent,
        MenuComponent,
        GoogleAuthComponent,
        YandexAuthComponent,
        AnonimAuthComponent,
        AvatarImagePipe
    ],
    providers: [ButtonControllerService, AudioServices],
    bootstrap: []
})
export class SharedModule { }
