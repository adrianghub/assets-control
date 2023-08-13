import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserParams } from '../dialogs/user-management.dialog';
import { User, UserDto } from '../users.model';

@Injectable()
export class UsersRepository {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<UserDto[]>(
      `${environment.jsonPlaceholderApiUrl}/users`
    );
  }

  getUserDetails(id: number): Observable<User> {
    return this.http.get<UserDto>(
      `${environment.jsonPlaceholderApiUrl}/users/${id}`
    );
  }

  postUser(params: UserParams): Observable<UserParams> {
    return this.http.post<UserParams>(
      `${environment.jsonPlaceholderApiUrl}/users`,
      params
    );
  }
}
