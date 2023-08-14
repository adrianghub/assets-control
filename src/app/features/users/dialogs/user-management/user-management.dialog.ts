import { DialogData } from '@/shared/ui/organisms/dialog/dialog.component';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InputComponent } from '@/shared/ui/atoms/input/input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { User } from '../../models/users.model';
import { notEmptyValidator } from '../../validators/notEmpty.validator';

interface UserFormGroup {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
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

  protected form!: FormGroup<UserFormGroup>;

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.form = new FormGroup<UserFormGroup>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [notEmptyValidator],
      }),
      username: new FormControl('', {
        nonNullable: true,
        validators: [notEmptyValidator],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [
          notEmptyValidator,
          Validators.minLength(9),
          Validators.maxLength(32),
        ],
      }),
    });

    this.data.input$
      ?.pipe(take(1))
      .subscribe(({ name, username, email, phone }) => {
        this.form.setValue({ name, username, email, phone });
      });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ name, username, email, phone }) => {
        this.data.options.disabled = this.form.invalid;

        if (!name || !username || !email || !phone) {
          return;
        }

        this.setResult({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          phone: phone.trim(),
        });
      });
  }

  setResult(params: UserParams): void {
    this.data.result = params;
  }
}
