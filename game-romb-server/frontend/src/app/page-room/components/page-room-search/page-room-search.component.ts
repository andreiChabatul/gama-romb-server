import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { RoomsService } from 'src/app/rooms/rooms.services';

@Component({
  selector: 'app-page-room-search',
  templateUrl: './page-room-search.component.html',
  styleUrls: ['./page-room-search.component.scss']
})
export class PageRoomSearchComponent implements OnInit, OnDestroy {

  searchForm: FormControl = new FormControl();
  subscription$: Subscription;

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.subscription$ = this.searchForm.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe(request => request ? this.roomsService.getRoom(request) : '')
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  clear(): void {
    this.searchForm.reset();
  }

}
