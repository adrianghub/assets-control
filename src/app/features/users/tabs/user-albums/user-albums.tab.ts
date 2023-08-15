import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { UserDetailsPage } from '../../pages/user-details/user-details.page';
import { UserDetailsFacade } from '../../store/user-details/user-details.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
  ],
  selector: 'app-user-albums-tab',
  templateUrl: './user-albums.tab.html',
})
export class UserAlbumsTab implements OnInit {
  protected userDetailsFacade = inject(UserDetailsFacade);
  private parent = inject(UserDetailsPage);

  ngOnInit() {
    this.userDetailsFacade.loadUserAlbums(this.parent.userId);
  }
}
