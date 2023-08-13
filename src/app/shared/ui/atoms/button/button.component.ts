import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatButtonModule, NgClass],
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input({ required: true }) text = '';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() variant: 'raised' | 'stroked' | 'flat' | 'menu' = 'stroked';
  @Input() disabled = false;

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
