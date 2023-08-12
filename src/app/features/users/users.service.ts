import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserDto } from './users.model';

@Injectable()
export class UsersService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<UserDto[]>(
      `${environment.jsonPlaceholderApiUrl}/users`
    );
  }
}
