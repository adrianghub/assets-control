import { DestroyRef, Directive, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTabLink } from '@angular/material/tabs';
import { RouterLinkActive } from '@angular/router';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'a[routerLinkActive][mat-tab-link]', standalone: true })
export class MatTabRouterLinkActiveDirective implements OnInit {
  private routerLinkActive = inject(RouterLinkActive);
  private matTabLink = inject(MatTabLink);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.routerLinkActive.isActiveChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => (this.matTabLink.active = value));
  }
}
