import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  TemplateRef,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
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
  imports: [MatDialogModule, ButtonComponent, NgIf, NgTemplateOutlet],
  providers: [MatDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent<I, R> {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData<I, R>) {}
}
