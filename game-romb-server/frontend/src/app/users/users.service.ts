import { Injectable } from '@angular/core';
import { JwtPayload, deleteUserDto, updateUser } from '../types';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ENDPOINT } from '../const/enum';
import { BASIC_URL } from '../const';
import { AppStore, infoUser } from '../types/state';
import { Store } from '@ngrx/store';
import { RoomsService } from '../rooms/rooms.services';
import { AddModalInfo } from 'src/store/actions/modalActions';
import { UpdateUser, loginUser, logoutUser } from 'src/store/actions/userActions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private store: Store<AppStore>, private roomsServices: RoomsService) { }

  getUser(accessToken: string): void {
    const idUser = jwtDecode<JwtPayload>(accessToken).id;
    this.http.get(`${BASIC_URL}${ENDPOINT.USER}/${idUser}`).subscribe({
      next: (payload: Partial<infoUser>) => {
        this.store.dispatch(loginUser({ payload }));
        this.roomsServices.reconnectRoom(payload.id);
      },
      error: (error: HttpErrorResponse) => this.store.dispatch(AddModalInfo({ modalError: error.error.message }))
    });
  }

  updateUser(updateUser: updateUser): void {
    this.http.patch(`${BASIC_URL}${ENDPOINT.USER}/${updateUser.userId}`, updateUser).subscribe({
      next: (payload: Partial<infoUser>) => this.store.dispatch(UpdateUser({ payload })),
      error: (error: HttpErrorResponse) => this.store.dispatch(AddModalInfo({ modalError: error.error.message }))
    });
  }

  deleteUser(deleteUserDto: deleteUserDto): void {
    this.http.delete(`${BASIC_URL}${ENDPOINT.USER}`, { responseType: 'text', body: deleteUserDto }).subscribe({
      next: (payload) => payload ? this.store.dispatch(logoutUser()) : null,
      error: (error: HttpErrorResponse) => this.store.dispatch(AddModalInfo({ modalError: error.error.message }))
    });
  }

  logOut(): void {
    localStorage.removeItem('Authorization');
    this.store.dispatch(logoutUser());
  }

}
