import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PageRulesComponent } from './page/page-rules.component';



@NgModule({
  declarations: [
    PageRulesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PageRulesModule { }
