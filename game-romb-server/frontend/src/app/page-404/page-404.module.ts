import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './pages/page-404.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    Page404Component
  ]
})
export class Page404Module { }
