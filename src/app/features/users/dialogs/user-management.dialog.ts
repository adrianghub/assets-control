import { DialogData } from '@/app/shared/ui/organisms/dialog/dialog.component';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { InputComponent } from '@/app/shared/ui/atoms/input/input.component';
import { User } from '../users.model';

interface UserFormGroup {
  name: FormControl<string>;
}

export interface UserParams {
  name: string;
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
      }),
    });

    this.form.valueChanges.subscribe(({ name }) => {
      if (!name) {
        return;
      }

      this.setResult({
        name: name.trim(),
      });

      this.data.options.disabled = this.form.invalid;
    });
  }

  setResult(params: UserParams): void {
    this.data.result = params;
  }
}
