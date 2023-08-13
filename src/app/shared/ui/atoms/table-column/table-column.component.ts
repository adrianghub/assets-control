import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatTableModule,
} from '@angular/material/table';
import { TableComponent } from '../../organisms/table/table.component';

@Component({
  standalone: true,
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  imports: [TableComponent, MatTableModule, NgTemplateOutlet],
})
export class TableColumnComponent implements AfterContentInit {
  @ViewChild(MatCellDef, { static: true }) matCellDef!: MatCellDef;
  @ViewChild(MatHeaderCellDef, { static: true })
  matHeaderCellDef!: MatHeaderCellDef;

  @ContentChild(TemplateRef) cell!: TemplateRef<unknown>;

  protected matColumnDef = inject(MatColumnDef);

  ngAfterContentInit() {
    this.matColumnDef.cell = this.matCellDef;
    this.matColumnDef.headerCell = this.matHeaderCellDef;
  }
}
