import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-base-layout',
  template: `<router-outlet />`,
  styleUrls: ['./base.layout.scss'],
  imports: [RouterModule],
})
export class BaseLayout {}
