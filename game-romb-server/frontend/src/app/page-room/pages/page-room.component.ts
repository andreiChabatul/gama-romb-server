import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { RoomsService } from 'src/app/rooms/rooms.services';

import { Button } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { selectAllRooms } from 'src/store/selectors';

@Component({
  selector: 'app-page-room',
  templateUrl: './page-room.component.html',
  styleUrls: ['./page-room.component.scss']
})
export class PageRoomComponent implements OnInit {

  rooms$ = this.store.select(selectAllRooms);
  buttons: Button[] = [
    { action: ACTIONS_BUTTON.UPDATE_ROOM, width: "3vw" },
    { action: ACTIONS_BUTTON.ADD_ROOM, width: "3vw" }
  ]

  constructor(private store: Store<AppStore>, private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.roomsService.getAllRooms();
  }

}
