import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AlbumPhoto } from '../../models/album-photo.model';

@Component({
  standalone: true,
  selector: 'app-album-photo-card',
  templateUrl: './album-photo-card.component.html',
  styleUrls: ['./album-photo-card.component.scss'],
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumPhotoCardComponent {
  @Input() photo!: AlbumPhoto;
}
