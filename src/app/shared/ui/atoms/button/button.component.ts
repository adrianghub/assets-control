import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatButtonModule, NgClass, NgStyle],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styles: [
    `
      :host(.disabled) {
        pointer-events: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input({ required: true }) text = '';
  @Input() color?: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() variant?: 'raised' | 'stroked' | 'flat' | 'menu' = 'stroked';
  @Input() @HostBinding('class.disabled') disabled?: boolean = false;
}
