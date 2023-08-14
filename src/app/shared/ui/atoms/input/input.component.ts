import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    IconButtonComponent,
  ],
})
export class InputComponent<T> {
  @Input({ required: true }) control!: FormControl<T>;
  @Input({ required: true }) label!: string;
  @Input() type: 'text' | 'number' | 'email' = 'text';
}
