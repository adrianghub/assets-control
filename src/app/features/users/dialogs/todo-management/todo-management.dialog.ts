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

import { SelectComponent } from '@/app/shared/ui/atoms/select/select.component';
import { InputComponent } from '@/shared/ui/atoms/input/input.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { Todo } from '../../models/todos.model';

interface UserFormGroup {
  title: FormControl<string>;
  completed: FormControl<boolean>;
}

export interface UserParams {
  title: string;
  completed: boolean;
}

interface CompletedOptions {
  label: Completed;
  value: boolean;
}

type Completed = 'Yes' | 'No';

@Component({
  standalone: true,
  selector: 'app-todo-management-dialog',
  templateUrl: './todo-management.dialog.html',
  styleUrls: ['././todo-management.dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputComponent, SelectComponent],
})
export class TodoManagementDialog implements OnInit {
  @Input() data!: DialogData<Todo, UserParams>;

  protected form!: FormGroup<UserFormGroup>;

  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.form = new FormGroup<UserFormGroup>({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      completed: new FormControl(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    this.data.input$?.pipe(take(1)).subscribe(({ title, completed }) => {
      this.form.setValue({
        title,
        completed: this.completedOptions[completed ? 0 : 1].value,
      });
    });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ title, completed }) => {
        this.data.options.disabled = this.form.invalid;

        if (!title) {
          return;
        }

        this.setResult({
          title: title.trim(),
          completed: !!completed,
        });
      });
  }

  setResult(params: UserParams): void {
    this.data.result = params;
  }

  protected readonly completedOptions: CompletedOptions[] = [
    {
      label: 'Yes',
      value: true,
    },
    {
      label: 'No',
      value: false,
    },
  ];
}
