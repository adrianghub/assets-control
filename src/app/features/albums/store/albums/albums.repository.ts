import { environment } from '@/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, AlbumDto } from '../../models/albums.model';

@Injectable()
export class AlbumsRepository {
  private http = inject(HttpClient);

  getAlbums(): Observable<Album[]> {
    return this.http.get<AlbumDto[]>(
      `${environment.jsonPlaceholderApiUrl}/albums`
    );
  }
}
