import { DialogComponent } from '@/app/shared/ui/organisms/dialog/dialog.component';
import { DestroyRef, Injectable, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { filter, of } from 'rxjs';
import { UsersFacade } from './store/users.facade';
import { User } from './users.model';

interface DialogParams {
  dialog: MatDialog;
  dialogRef: TemplateRef<MatDialog>;
}

@Injectable()
export class UserManagementService {
  private usersFacade = inject(UsersFacade);
  private destroyRef = inject(DestroyRef);

  openAddUserDialog({ dialog, dialogRef }: DialogParams): void {
    dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          labels: {
            title: 'Add user',
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
        filter((results) => !!results),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) => this.usersFacade.addUser(result));
  }

  openEditUserDialog({
    dialog,
    dialogRef,
    userDetails,
  }: DialogParams & { userDetails: User }): void {
    console.log(userDetails);

    dialog
      .open(DialogComponent, {
        data: {
          templateRef: dialogRef,
          input$: of(userDetails),
          labels: {
            title: 'Edit user',
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
        filter((results) => !!results),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((result) =>
        this.usersFacade.editUser({ ...result, id: userDetails.id })
      );
  }
}
