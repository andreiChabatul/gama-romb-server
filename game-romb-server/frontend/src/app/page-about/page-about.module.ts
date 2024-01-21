import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageAboutComponent } from './pages/page-about.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PageAboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PageAboutModule { }
