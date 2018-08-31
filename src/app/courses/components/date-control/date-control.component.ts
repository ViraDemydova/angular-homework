import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateControlComponent), multi: true }
  ]
})

export class DateControlComponent implements ControlValueAccessor {
  createDate: any;
  propagateChange = (_: any) => {};
  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  onChangeInput(e) {
    const value = e.currentTarget.value;

    if (value !== this.createDate) {
      this.createDate = value;
      this.onTouched (value);
      this.onChange (value);
    }
  }

  writeValue(value: any) {
    this.createDate = value || null;
  }

  registerOnTouched(fn: (_: any) => {}): void {this.onTouched = fn; }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
}
