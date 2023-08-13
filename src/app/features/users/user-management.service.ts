import {
  DialogComponent,
  DialogData,
} from '@/app/shared/ui/organisms/dialog/dialog.component';
import { Injectable, TemplateRef, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter, switchMap, take } from 'rxjs';
import { UserParams } from './dialogs/user-management.dialog';
import { User } from './users.model';
import { UsersRepository } from './users.repository';

interface DialogParams {
  details$?: Observable<User>;
  dialog: MatDialog;
  dialogRef: TemplateRef<MatDialog>;
}

@Injectable()
export class UserManagementService {
  private usersRepository = inject(UsersRepository);

  openUserAddDialog({ dialog, dialogRef }: DialogParams): void {
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
            disabled: false,
          },
        } as DialogData<User, UserParams>,
        disableClose: true,
        width: '400px',
      })
      .afterClosed()
      .pipe(
        take(1),
        filter((results) => !!results),
        switchMap((results) => this.usersRepository.postUser(results))
      )
      .subscribe();
  }
}
