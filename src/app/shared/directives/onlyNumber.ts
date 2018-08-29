import {
  ReactiveFormsModule,
  NG_VALIDATORS,
  FormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersonly][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: NumbersOnly,
      multi: true
    }
  ]
})
export class NumbersOnly implements Validator {
  validate(c: FormControl) {
    console.log('VALIDATOR', c);

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
}
