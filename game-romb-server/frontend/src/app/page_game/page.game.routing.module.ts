import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageGameComponent } from './pages/page-game/page-game.component';

const routes: Routes = [{ path: '', component: PageGameComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageGameRoutingModule {}