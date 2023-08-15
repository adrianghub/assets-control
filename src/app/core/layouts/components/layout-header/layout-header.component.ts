import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  standalone: true,
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IconButtonComponent,
    NgxSkeletonLoaderModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
  @Input({ required: true }) title?: string;
  @Input() loading = false;
  @Input() backNavLink?: string;
}
