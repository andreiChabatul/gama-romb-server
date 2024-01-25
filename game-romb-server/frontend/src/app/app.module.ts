import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageGameModule } from './page_game/pageGame.modules';
import { MainPageComponent } from './main-page/main-page.component';
import { appReducers } from 'src/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AccessTokenInterceptor } from './interceptors/accessToken.interceptor';
import { ModalModule } from './modal/modal.module';
import { EFFECTS } from 'src/store/effects';
import { Page404Module } from './page-404/page-404.module';
import { PageAboutModule } from './page-about/page-about.module';
import { PageRulesModule } from './page-rules/page-rules.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    ModalModule,
    BrowserModule,
    AppRoutingModule,
    PageGameModule,
    SharedModule,
    CommonModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(EFFECTS),
    StoreModule.forRoot(appReducers),
    HttpClientModule,
    Page404Module,
    PageAboutModule,
    PageRulesModule
  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AccessTokenInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
