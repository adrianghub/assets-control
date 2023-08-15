import { Album, AlbumDto } from '@/app/shared/models/album.model';
import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AlbumsRepository {
  private http = inject(HttpClient);

  getAlbums(): Observable<Album[]> {
    return this.http.get<AlbumDto[]>(
      `${environment.jsonPlaceholderApiUrl}/albums`
    );
  }
}
