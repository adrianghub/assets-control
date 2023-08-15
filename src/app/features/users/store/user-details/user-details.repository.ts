import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo, TodoDto } from '../../models/todos.model';
import { User, UserDto } from '../../models/users.model';

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
