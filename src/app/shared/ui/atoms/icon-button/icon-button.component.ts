import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [NgClass, MatButtonModule, MatIconModule],
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  @Input({ required: true }) icon!: string;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() type: 'raised' | 'stroked' | 'flat' | 'menu' = 'menu';
  @Input() disabled = false;

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
