import { FormControl } from '@angular/forms';
import { notEmptyValidator } from './notEmpty.validator';

describe('notEmptyValidator', () => {
  let control: FormControl;

  beforeEach(() => {
    control = new FormControl();
  });

  it('should return null for valid input', () => {
    control.setValue('valid input');
    const result = notEmptyValidator(control);
    expect(result).toBeNull();
  });

  it('should return null for valid input', () => {
    control.setValue('valid input');
    const result = notEmptyValidator(control);
    expect(result).toBeNull();
  });

  it('should return an object with "required" property for an empty input', () => {
    control.setValue('');
    const result = notEmptyValidator(control);
    expect(result).toEqual({ required: true });
  });

  it('should return an object with "required" property for input with whitespace', () => {
    control.setValue('  ');
    const result = notEmptyValidator(control);
    expect(result).toEqual({ required: true });
  });
});
