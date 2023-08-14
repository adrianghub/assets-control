import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { menuLinks } from '../../layout.const';

@Component({
  standalone: true,
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
  imports: [NgFor, MatDividerModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutHeaderComponent {
  @Input() title = 'Assets Control';
  @Input({ required: true }) subtitle!: string;

  menuLinks = menuLinks;
}
