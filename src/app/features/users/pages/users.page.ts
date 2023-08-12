import { TablePageAbstract } from '@/app/shared/table-page.abstract';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/molecules/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/molecules/table/table.component';
import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatColumnDef,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../users.model';
import { UsersService } from '../users.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatTableModule,
    ButtonComponent,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    NgFor,
  ],
  providers: [MatColumnDef],
  selector: 'app-users-page',
  templateUrl: './users.page.html',
})
export class UsersPage extends TablePageAbstract implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  protected dataSource!: MatTableDataSource<User>;
  protected resultsLength!: number;
  protected pageSizeOptions: number[] = [5, 10];

  protected usersService = inject(UsersService);

  ngOnInit() {
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = users.length;
      });
  }
}
