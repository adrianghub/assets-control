import { LayoutHeaderComponent } from '@/app/core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TodoManagementDialog } from '../../dialogs/todo-management/todo-management.dialog';
import { Todo } from '../../models/todos.model';
import { User } from '../../models/users.model';
import { TodoManagementService } from '../../services/todos-management.service';
import { UserDetailsFacade } from '../../store/user-details/user-details.facade';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    CommonModule,
    JsonPipe,
    LayoutHeaderComponent,
    ButtonComponent,
    TodoManagementDialog,
    MatDialogModule,
    IconButtonComponent,
  ],
  selector: 'app-user-details-page',
  templateUrl: './user-details.page.html',
})
export class UserDetailsPage implements OnInit {
  protected userDetailsFacade = inject(UserDetailsFacade);
  protected todosRepositoryService = inject(TodoManagementService);
  protected route = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);

  protected user!: User;

  ngOnInit() {
    const userId = this.route.snapshot.params['id'];

    this.userDetailsFacade.loadUserDetails(userId);
    this.userDetailsFacade.loadUserTodos(userId);
  }

  openAddTodoDialog(dialogRef: TemplateRef<MatDialog>) {
    this.todosRepositoryService.openAddTodoDialog({
      dialogRef,
      dialog: this.dialog,
    });
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
}
