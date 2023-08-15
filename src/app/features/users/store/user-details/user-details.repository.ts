import { Album, AlbumDto } from '@/app/shared/models/album.model';
import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoDto } from '../../models/todo.model';
import { User, UserDto } from '../../models/user.model';

@Injectable()
export class UserDetailsRepository {
  private http = inject(HttpClient);

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<UserDto>(
      `${environment.jsonPlaceholderApiUrl}/users/${userId}`
    );
  }

  getUserTodos(userId: number): Observable<Todo[]> {
    return this.http.get<TodoDto[]>(
      `${environment.jsonPlaceholderApiUrl}/users/${userId}/todos`
    );
  }

  getUserAlbums(userId: number): Observable<Album[]> {
    return this.http.get<AlbumDto[]>(
      `${environment.jsonPlaceholderApiUrl}/users/${userId}/albums`
    );
  }

  postTodo(params: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      `${environment.jsonPlaceholderApiUrl}/users`,
      params
    );
  }

  patchTodo(params: Todo): Observable<Todo> {
    return this.http.patch<Todo>(
      `${environment.jsonPlaceholderApiUrl}/todos/${params.id}`,
      params
    );
  }

  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.jsonPlaceholderApiUrl}/todos/${todoId}`
    );
  }
}
