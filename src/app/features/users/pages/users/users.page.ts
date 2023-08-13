import { LayoutHeaderComponent } from '@/app/core/layouts/components/layout-header/layout-header.component';
import { TablePageAbstract } from '@/app/shared/table-page.abstract';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatColumnDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserManagementDialog } from '../../dialogs/user-management.dialog';
import { UserManagementService } from '../../user-management.service';
import { User } from '../../users.model';
import { UsersRepository } from '../../users.repository';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatDialogModule,
    ButtonComponent,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    LayoutHeaderComponent,
    NgFor,
    UserManagementDialog,
    HttpClientModule,
  ],
  providers: [MatColumnDef],
  selector: 'app-users-page',
  templateUrl: './users.page.html',
})
export class UsersPage extends TablePageAbstract {
  @ViewChild('paginator') paginator!: MatPaginator;

  protected dataSource!: MatTableDataSource<User>;
  protected resultsLength!: number;
  protected pageSizeOptions: number[] = [5, 10];

  protected usersRepository = inject(UsersRepository);
  protected userManagementService = inject(UserManagementService);
  protected dialog = inject(MatDialog);

  openUserManagementDialog(dialogRef: TemplateRef<MatDialog>) {
    this.userManagementService.openUserAddDialog({
      dialogRef,
      dialog: this.dialog,
    });
  }
}
