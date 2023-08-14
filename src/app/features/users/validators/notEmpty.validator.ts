import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const notEmptyValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const isWhitespace =
    control?.value === '' || control?.value?.trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { required: true };
};
