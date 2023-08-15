import { LayoutHeaderComponent } from '@/app/core/layouts/components/layout-header/layout-header.component';
import { ButtonComponent } from '@/app/shared/ui/atoms/button/button.component';
import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { TableColumnComponent } from '@/app/shared/ui/atoms/table-column/table-column.component';
import { TableColumnsComponent } from '@/app/shared/ui/organisms/table/table-columns.component';
import { TableComponent } from '@/app/shared/ui/organisms/table/table.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatColumnDef, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AlbumPhotoCardComponent } from '../../components/album-photo-card/album-photo-card.component';
import { AlbumPhotosSkeletonComponent } from '../../components/album-photos-skeleton/album-photos-skeleton.component';
import { AlbumDetailsFacade } from '../../store/album-details/album-details.facade';

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
    AlbumPhotoCardComponent,
    AlbumPhotosSkeletonComponent,
    NgxSkeletonLoaderModule,
  ],
  providers: [MatColumnDef],
  selector: 'app-album-details-page',
  templateUrl: './album-details.page.html',
  styleUrls: ['./album-details.page.scss'],
})
export class AlbumDetailsPage implements OnInit {
  protected albumDetailsFacade = inject(AlbumDetailsFacade);
  protected route = inject(ActivatedRoute);

  ngOnInit(): void {
    const albumId = this.route.snapshot.params['id'];

    this.albumDetailsFacade.loadAlbumDetails(albumId);
    this.albumDetailsFacade.loadAlbumPhotos(albumId);
  }
}
