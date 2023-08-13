import { TableRow } from '@/app/shared/models/table.model';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    CommonModule,
  ],
  selector: 'app-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit {
  @Input({ required: true }) data$!: Observable<T[]>;
  @Input() pageSizeOptions: number[] = [5, 10];
  @Input() pageSize = 10;
  @Input() rowHover = false;

  @Output() rowSelected = new EventEmitter<TableRow>();

  @ViewChild(MatTable, { static: true }) table!: MatTable<TableComponent<T>>;
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource!: MatTableDataSource<T>;
  displayedColumns: string[] = [];
  resultsLength!: number;

  ngOnInit() {
    this.data$.pipe(take(1)).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.resultsLength = data.length;
    });
  }
}
