import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRoomComponent } from './pages/page-room.component';

const routes: Routes = [{ path: '', component: PageRoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoomRoutingModule {}