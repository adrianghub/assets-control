import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  inject,
} from '@angular/core';
import { MatColumnDef } from '@angular/material/table';
import { TableComponent } from './table.component';

@Component({
  standalone: true,
  selector: 'app-table-columns',
  template: '',
})
export class TableColumnsComponent<T> implements AfterContentInit {
  @ContentChildren(MatColumnDef) columnDefs!: QueryList<MatColumnDef>;

  private tableComponent = inject(TableComponent<T>);

  ngAfterContentInit(): void {
    this.updateColumnDefs();
  }

  updateColumnDefs(): void {
    this.columnDefs.forEach((def) => {
      this.tableComponent.table.addColumnDef(def);
    });

    this.tableComponent.displayedColumns = this.getColumnNames();
  }

  private getColumnNames(): string[] {
    return this.columnDefs.toArray().map((columnDef) => columnDef.name);
  }
}
