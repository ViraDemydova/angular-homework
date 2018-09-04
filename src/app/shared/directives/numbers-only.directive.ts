import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { Directive } from '@angular/core';
@Directive({
  selector: '[numbersonly][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumbersOnlyDirective,
      multi: true
    }
  ]
})
// Название файла и название класса не совпадают
export class NumbersOnlyDirective implements Validator {
  validate(c: FormControl) {
    return numbersonly(c);
  }
}

export function numbersonly(c: FormControl) {
  const isValid = /^-?(0|[1-9]\d*)?$/.test(c.value);
  if (isValid) {
    return null;
  } else {
    return {
      numbersonly: {
        valid: false
      }
    };
  }
}
