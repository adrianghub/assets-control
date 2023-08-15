import { LayoutHeaderComponent } from '@/app/core/layouts/components/layout-header/layout-header.component';
import { TablePageAbstract } from '@/app/shared/table-page.abstract';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatColumnDef, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AlbumsFacade } from '../../store/albums/albums.facade';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    ButtonComponent,
    TableComponent,
    TableColumnComponent,
    TableColumnsComponent,
    LayoutHeaderComponent,
    HttpClientModule,
    IconButtonComponent,
    RouterModule,
  ],
  providers: [MatColumnDef],
  selector: 'app-albums-page',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
})
export class AlbumsPage extends TablePageAbstract implements OnInit {
  protected albumsFacade = inject(AlbumsFacade);

  ngOnInit(): void {
    this.albumsFacade.loadAlbums();
  }
}
