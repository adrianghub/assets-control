import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  TemplateRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemePalette } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../atoms/button/button.component';

export interface DialogData<I, R> {
  templateRef: TemplateRef<unknown>;
  input$: Observable<I>;
  labels: {
    title: string;
    submit: string;
    cancel: string;
  };
  submitColor?: ThemePalette;
  result: R;
  options: {
    disabled: boolean;
  };
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, MatDialogModule, ButtonComponent],
  providers: [MatDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent<I, R> implements OnInit {
  protected data: DialogData<I, R> = inject(MAT_DIALOG_DATA);

  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.dialogRef
      .keydownEvents()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event.key === 'Escape') {
          this.onCancel();
        }
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
