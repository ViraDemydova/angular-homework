import {
  ReactiveFormsModule,
  NG_VALIDATORS,
  FormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  Validator
} from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[datevalidator][formControlName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateValidator,
      multi: true
    }
  ]
})

export class DateValidator implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = this.dateValidator();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

  public dateValidator(): ValidatorFn {
    return (c: FormControl) => {
      const isValid = /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(c.value);
      if (isValid) {
        return null;
      } else {
        return {
          datevalidator: {
            valid: false
          }
        };
      }
    };
  }
}
