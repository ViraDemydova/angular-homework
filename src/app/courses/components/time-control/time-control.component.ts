import {Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeControlComponent), multi: true }
  ]
})
export class TimeControlComponent implements ControlValueAccessor {
   duration: number;
  propagateChange = (_: any) => {};
  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  onChangeInput(e) {
    const value = e.currentTarget.value;

    if (value !== this.duration) {
      this.duration = value;
      this.onTouched (value);
      this.onChange (value);
    }
  }

  writeValue(value: any) {
    this.duration = value || null;
  }

  registerOnTouched(fn: (_: any) => {}): void {this.onTouched = fn; }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
}
