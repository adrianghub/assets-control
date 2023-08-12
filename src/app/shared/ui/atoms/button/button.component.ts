import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule, NgClass],
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text = '';
  @Input() disabled = false;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() type: 'raised' | 'stroked' | 'flat' | 'menu' = 'stroked';

  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
}
