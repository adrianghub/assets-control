import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableRow } from './models/table.model';

@Directive()
export abstract class TablePageAbstract {
  private router = inject(Router);

  goToDetails(item: TableRow, baseUrl: string): void {
    this.router.navigateByUrl(`${baseUrl}/${item.id}`);
  }
}
