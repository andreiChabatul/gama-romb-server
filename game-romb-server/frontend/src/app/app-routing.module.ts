import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { Page404Component } from './page-404/pages/page-404.component';
import { PageAboutComponent } from './page-about/pages/page-about.component';
import { PageRulesComponent } from './page-rules/page/page-rules.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./page-room/pageRoom.module').then((m) => m.PageRoomModule),
  },
  {
    path: 'game',
    loadChildren: () =>
      import('./page_game/pageGame.modules').then((m) => m.PageGameModule),
  },
  {
    path: 'about',
    component: PageAboutComponent,
  },
  {
    path: 'rules',
    component: PageRulesComponent,
  },
  {
    path: '**',
    component: Page404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
