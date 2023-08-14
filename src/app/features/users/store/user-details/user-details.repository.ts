import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoDto } from '../../models/todos.model';
import { User, UserDto } from '../../models/users.model';

@Injectable()
export class UserDetailsRepository {
  private http = inject(HttpClient);

  getUserDetails(id: number): Observable<User> {
    return this.http.get<UserDto>(
      `${environment.jsonPlaceholderApiUrl}/users/${id}`
    );
  }

  getUserTodos(id: number): Observable<Todo[]> {
    return this.http.get<TodoDto[]>(
      `${environment.jsonPlaceholderApiUrl}/users/${id}/todos`
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
}
