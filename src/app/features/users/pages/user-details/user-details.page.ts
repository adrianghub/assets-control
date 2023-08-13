import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { User } from '../../users.model';
import { UsersService } from '../../users.service';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    CommonModule,
    JsonPipe,
  ],
  selector: 'app-user-details-page',
  templateUrl: './user-details.page.html',
})
export class UserDetailsPage implements OnInit {
  protected usersService = inject(UsersService);
  protected route = inject(ActivatedRoute);

  protected user!: User;

  ngOnInit() {
    this.usersService
      .getUser(this.route.snapshot.params['id'])
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user;
      });
  }
}
