import { Injectable } from '@angular/core';
import { createRoomDto, infoRoom } from '../types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ENDPOINT } from '../const/enum';
import { BASIC_URL } from '../const';
import { AppStore } from '../types/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ReconnectRoom, UpdateRooms } from 'src/store/actions/roomsActions';
import { AddModalInfo } from 'src/store/actions/modalActions';

@Injectable({
    providedIn: 'root'
})
export class RoomsService {

    constructor(private http: HttpClient, private store: Store<AppStore>) { }

    getAllRooms(): void {
        this.http.get(`${BASIC_URL}${ENDPOINT.ROOMS}`).subscribe({
            next: (rooms) => this.store.dispatch(UpdateRooms({ infoRooms: rooms as infoRoom[] })),
            error: (error: HttpErrorResponse) => this.store.dispatch(AddModalInfo({ modalError: error.error.message }))
        });
    }

    createRoom(createRoomDto: createRoomDto): Observable<string> {
        return this.http.post(`${BASIC_URL}${ENDPOINT.ROOMS}`, createRoomDto, { responseType: 'text' });
    }

    getRoom(reguest: string): void {
        this.http.get(`${BASIC_URL}${ENDPOINT.ROOMS}${reguest}`).subscribe({
            next: (rooms) => this.store.dispatch(UpdateRooms({ infoRooms: rooms as infoRoom[] })),
            error: (error: HttpErrorResponse) => this.store.dispatch(AddModalInfo({ modalError: error.error.message }))
        });
    }

    reconnectRoom(idUser: string | undefined): void {
        if (idUser) {
            this.http.post(`${BASIC_URL}${ENDPOINT.ROOMS_RECONNECT}`, { idUser }).subscribe(
                (room) => room ? this.store.dispatch(ReconnectRoom({ reconnectRoom: room as infoRoom })) : '')
        }
    }

}