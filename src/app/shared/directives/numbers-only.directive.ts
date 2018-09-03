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

// Это функция-валидатор для реактивной формы.
// Применяется в классе.
// Поскольку логика для валидатора и для директивы одинакова,
// то эта функция используется выше в директиве.
// Название директивы и название функции выбрано одинаковое,
// чтобы numbersonly можно было добавить или в шаблон или в класс, для разных типов форм конечно.
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
