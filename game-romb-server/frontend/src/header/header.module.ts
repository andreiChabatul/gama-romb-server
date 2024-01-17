import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialsModule } from 'src/app/materials/materials.module';


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        MaterialsModule

    ],
    exports: [HeaderComponent],
    providers: [],
    bootstrap: []
})
export class HeaderModule { }
