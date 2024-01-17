import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ACTIONS_BUTTON } from 'src/app/const/enum';
import { RoomsService } from 'src/app/rooms/rooms.services';
import { infoRoom } from 'src/app/types';
import { Button } from 'src/app/types/components';
import { AppStore } from 'src/app/types/state';
import { selectAllRooms } from 'src/store/selectors';

@Component({
  selector: 'app-page-room',
  templateUrl: './page-room.component.html',
  styleUrls: ['./page-room.component.scss']
})
export class PageRoomComponent implements OnInit, OnDestroy {

  rooms$ = this.store.select(selectAllRooms);
  rooms: infoRoom[] = [];
  subcription$: Subscription;
  buttons: Button[] = [
    { action: ACTIONS_BUTTON.UPDATE_ROOM, width: "3vw" },
    { action: ACTIONS_BUTTON.ADD_ROOM, width: "3vw" }
  ]

  constructor(private store: Store<AppStore>, private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.subcription$ = this.rooms$.subscribe((rooms) =>
      this.rooms = rooms); //rooms.filter((room) => !room.isStart)
    this.roomsService.getAllRooms();
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
  }

}
