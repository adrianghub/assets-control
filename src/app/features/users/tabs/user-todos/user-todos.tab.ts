import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TodoDeleteDialog } from '../../dialogs/todo-management/todo-delete/todo-delete.dialog';
import { TodoManagementDialog } from '../../dialogs/todo-management/todo-management.dialog';
import { Todo } from '../../models/todo.model';
import { UserDetailsPage } from '../../pages/user-details/user-details.page';
import { TodoManagementService } from '../../services/todos-management.service';
import { UserDetailsFacade } from '../../store/user-details/user-details.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    TodoManagementDialog,
    TodoDeleteDialog,
    MatDialogModule,
    IconButtonComponent,
  ],
  selector: 'app-user-todos-tab',
  templateUrl: './user-todos.tab.html',
  styleUrls: ['./user-todos.tab.scss'],
})
export class UserTodosTab implements OnInit {
  protected userDetailsFacade = inject(UserDetailsFacade);
  protected todosRepositoryService = inject(TodoManagementService);
  protected route = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);
  private parent = inject(UserDetailsPage);

  ngOnInit() {
    this.userDetailsFacade.loadUserTodos(this.parent.userId);
  }

  openEditTodoDialog(
    $event: MouseEvent,
    dialogRef: TemplateRef<MatDialog>,
    todo: Todo
  ) {
    $event.stopPropagation();

    this.todosRepositoryService.openEditTodoDialog({
      todo,
      dialogRef,
      dialog: this.dialog,
    });
  }

  openDeleteTodoDialog(
    $event: MouseEvent,
    dialogRef: TemplateRef<MatDialog>,
    todo: Todo
  ) {
    $event.stopPropagation();

    this.todosRepositoryService.openDeleteTodoDialog({
      todo,
      dialogRef,
      dialog: this.dialog,
    });
  }
}
