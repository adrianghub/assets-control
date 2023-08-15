import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  standalone: true,
  selector: 'app-album-photos-skeleton',
  templateUrl: './album-photos-skeleton.component.html',
  styleUrls: ['./album-photos-skeleton.component.scss'],
  imports: [NgxSkeletonLoaderModule],
})
export class AlbumPhotosSkeletonComponent {}
