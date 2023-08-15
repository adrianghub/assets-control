import { IconButtonComponent } from '@/app/shared/ui/atoms/icon-button/icon-button.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { menuLinks } from '../../layout.const';

@Component({
  standalone: true,
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  imports: [
    CommonModule,
    MatDividerModule,
    RouterModule,
    MatIconModule,
    IconButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
  @Input() title = 'Assets Control';
  @Input() backNavLink?: string;
  @Input({ required: true }) subtitle!: string;

  menuLinks = menuLinks;
}
