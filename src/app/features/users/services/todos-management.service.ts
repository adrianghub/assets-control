import { DialogComponent } from '@/app/shared/ui/organisms/dialog/dialog.component';
import { DestroyRef, Injectable, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { filter, of } from 'rxjs';
import { Todo } from '../models/todo.model';
import { UserDetailsFacade } from '../store/user-details/user-details.facade';

interface DialogParams {
  dialog: MatDialog;
  dialogRef: TemplateRef<MatDialog>;
}

@Injectable()
export class TodoManagementService {
  private userDetailsFacade = inject(UserDetailsFacade);
  private destroyRef = inject(DestroyRef);

  openAddTodoDialog({ dialog, dialogRef }: DialogParams): void {
    dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          labels: {
            title: 'Add todo',
            submit: 'Submit',
            cancel: 'Cancel',
          },
          options: {
            disabled: true,
          },
        },
        disableClose: true,
        width: '400px',
      })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) => this.userDetailsFacade.addTodo(result));
  }

  openEditTodoDialog({
    dialog,
    dialogRef,
    todo,
  }: DialogParams & { todo: Todo }): void {
    dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          input$: of(todo),
          labels: {
            title: 'Edit todo',
            submit: 'Submit',
            cancel: 'Cancel',
          },
          options: {
            disabled: true,
          },
        },

        disableClose: true,
        width: '400px',
      })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) =>
        this.userDetailsFacade.editTodo({ ...result, id: todo.id })
      );
  }

  openDeleteTodoDialog({
    dialog,
    dialogRef,
    todo,
  }: DialogParams & { todo: Todo }): void {
    dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          input$: of(todo),
          labels: {
            title: 'Delete todo',
            submit: 'Submit',
            cancel: 'Cancel',
          },
          options: {
            disabled: false,
          },
          submitColor: 'warn',
          result: true,
        },
        disableClose: true,
        width: '600px',
      })
      .afterClosed()
      .pipe(
        filter((result) => !!result),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.userDetailsFacade.deleteTodo(todo.id));
  }
}
