import {Component, forwardRef, Input} from '@angular/core';
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
  @Input() duration: number;
  propagateChange = (_: any) => {};
  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  get value(): any { return this.duration; }

  set value(newValue: any) {
    if (newValue !== this.duration) {
      this.duration = newValue;
      this.onChange(newValue);
    }
  }

  writeValue(value: any) {
    this.duration = value || null;
  }

  registerOnTouched(fn: (_: any) => {}): void {this.onTouched = fn; }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
}
