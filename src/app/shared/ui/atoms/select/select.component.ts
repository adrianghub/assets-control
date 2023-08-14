import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  standalone: true,
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  imports: [
    CommonModule,
    IconButtonComponent,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> {
  @Input({ required: true }) options: { label: string; value: T }[] = [];
  @Input({ required: true }) control!: FormControl<T>;
  @Input({ required: true }) label!: string;
}
