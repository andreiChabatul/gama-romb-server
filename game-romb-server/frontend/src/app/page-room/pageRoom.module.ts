import { NgModule } from '@angular/core';
import { MaterialsModule } from 'src/app/materials/materials.module';
import { SharedModule } from '../shared/shared.module';
import { PageRoomComponent } from './pages/page-room.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { PageRoomSearchComponent } from './components/page-room-search/page-room-search.component';
import { CommonModule } from '@angular/common';
import { PageRoomRoutingModule } from './page.room.routing.module';
import { FreelyCellRoomComponent } from './components/freely-cell-room/freely-cell-room.component';

@NgModule({
    declarations: [
        PageRoomComponent,
        RoomItemComponent,
        PageRoomSearchComponent,
        FreelyCellRoomComponent

    ],
    imports: [
        SharedModule,
        MaterialsModule,
        CommonModule
    ],
    exports: [PageRoomRoutingModule],
    providers: [],
    bootstrap: []
})
export class PageRoomModule { }
