import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { menuLinks } from '../layout.const';

@Component({
  standalone: true,
  selector: 'app-base-layout',
  templateUrl: './base.layout.html',
  styleUrls: ['./base.layout.scss'],
  imports: [CommonModule, MatDividerModule, RouterModule],
})
export class BaseLayout {
  title = 'Assets Control';

  menuLinks = menuLinks;
}
