import { TableRow } from '@/app/shared/models/table.model';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

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
export class TableComponent<T> implements AfterViewInit {
  @Input({ required: true }) data$!: Observable<T[]>;
  @Input({ required: true }) loading$!: Observable<boolean>;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize = 10;
  @Input() rowHover = false;

  @Output() rowSelected = new EventEmitter<TableRow>();

  @ViewChild(MatTable, { static: true }) table!: MatTable<TableComponent<T>>;
  @ViewChild('paginator') paginator!: MatPaginator;

  protected dataSource!: MatTableDataSource<T>;
  protected resultsLength!: number;
  displayedColumns: string[] = [];

  private destroyRef = inject(DestroyRef);

  ngAfterViewInit() {
    this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      if (data.length) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = data.length;
      }
    });
  }
}
