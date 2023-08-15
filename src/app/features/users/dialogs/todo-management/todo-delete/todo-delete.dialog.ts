import { DialogData } from '@/app/shared/ui/organisms/dialog/dialog.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Todo } from '../../../models/todos.model';

@Component({
  standalone: true,
  selector: 'app-todo-delete-dialog',
  templateUrl: './todo-delete.dialog.html',
  styleUrls: ['./todo-delete.dialog.scss'],
  imports: [NgIf, AsyncPipe],
})
export class TodoDeleteDialog {
  @Input() data!: DialogData<Todo, boolean>;

  externalUrl = 'https://www.jsonplaceholder.org/';
}
