import { DialogData } from '@/shared/ui/organisms/dialog/dialog.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputComponent } from '@/shared/ui/atoms/input/input.component';
import { User } from '../users.model';

interface UserFormGroup {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<number | null>;
}

export interface UserParams {
  name: string;
  username: string;
  email: string;
  phone: string;
}

@Component({
  standalone: true,
  selector: 'app-user-management-dialog',
  templateUrl: './user-management.dialog.html',
  styleUrls: ['././user-management.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent],
})
export class UserManagementDialog implements OnInit {
  @Input() data!: DialogData<User, UserParams>;

  form!: FormGroup<UserFormGroup>;

  ngOnInit() {
    this.form = new FormGroup<UserFormGroup>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      }),
    });

    this.form.valueChanges.subscribe(({ name, username, email, phone }) => {
      this.data.options.disabled = this.form.invalid;

      if (!name || !username || !email || !phone) {
        return;
      }

      this.setResult({
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        phone: String(phone),
      });
    });
  }

  setResult(params: UserParams): void {
    this.data.result = params;
  }
}
