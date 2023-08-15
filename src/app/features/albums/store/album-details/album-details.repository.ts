import { Album, AlbumDto } from '@/app/shared/models/album.model';
import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AlbumPhoto, AlbumPhotoDto } from '../../models/album-photo.model';

@Injectable()
export class AlbumDetailsRepository {
  private http = inject(HttpClient);

  getAlbumDetails(albumId: number): Observable<Album> {
    return this.http.get<AlbumDto>(
      `${environment.jsonPlaceholderApiUrl}/albums/${albumId}`
    );
  }

  getAlbumPhotos(albumId: number): Observable<AlbumPhoto[]> {
    return this.http
      .get<AlbumPhotoDto[]>(
        `${environment.jsonPlaceholderApiUrl}/albums/${albumId}/photos`
      )
      .pipe(
        map((data) =>
          data.map(({ albumId, title, thumbnailUrl }) => ({
            albumId,
            title,
            url: thumbnailUrl,
          }))
        )
      );
  }
}
