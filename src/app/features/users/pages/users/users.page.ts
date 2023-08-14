import { LayoutHeaderComponent } from '@/app/core/layouts/components/layout-header/layout-header.component';
import { TablePageAbstract } from '@/app/shared/table-page.abstract';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatColumnDef, MatTableModule } from '@angular/material/table';
import { UserManagementDialog } from '../../dialogs/user-management/user-management.dialog';
import { User } from '../../models/users.model';
import { UserManagementService } from '../../services/users-management.service';
import { UsersFacade } from '../../store/users/users.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    ButtonComponent,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    LayoutHeaderComponent,
    HttpClientModule,
    IconButtonComponent,
    UserManagementDialog,
  ],
  providers: [MatColumnDef],
  selector: 'app-users-page',
  templateUrl: './users.page.html',
})
export class UsersPage extends TablePageAbstract implements OnInit {
  protected usersFacade = inject(UsersFacade);
  protected userManagementService = inject(UserManagementService);
  protected dialog = inject(MatDialog);

  ngOnInit(): void {
    this.usersFacade.loadUsers();
  }

  openAddUserDialog(dialogRef: TemplateRef<MatDialog>) {
    this.userManagementService.openAddUserDialog({
      dialogRef,
      dialog: this.dialog,
    });
  }

  openEditUserDialog(
    $event: MouseEvent,
    dialogRef: TemplateRef<MatDialog>,
    user: User
  ) {
    $event.stopPropagation();

    this.userManagementService.openEditUserDialog({
      dialogRef,
      dialog: this.dialog,
      userDetails: user,
    });
  }
}
