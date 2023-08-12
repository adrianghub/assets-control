import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  selector: 'app-root',
  template: `<router-outlet />`,
})
export class AppComponent {}
