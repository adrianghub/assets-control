import {
  DialogComponent,
  DialogData,
} from '@/app/shared/ui/organisms/dialog/dialog.component';
import { DestroyRef, Injectable, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';
import { UserParams } from './dialogs/user-management.dialog';
import { UsersFacade } from './store/users.facade';
import { User } from './users.model';

interface DialogParams {
  details$?: Observable<User>;
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
        } as DialogData<User, UserParams>,
        disableClose: true,
        width: '400px',
      })
      .afterClosed()
      .pipe(
        filter((results) => !!results),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((results) => this.usersFacade.addUser(results));
  }
}
