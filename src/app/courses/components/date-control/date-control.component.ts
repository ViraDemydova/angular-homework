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

export class DateControlComponent implements ControlValueAccessor{
  createDate: any;
  propagateChange = (_: any) => {};
  onChange = (_: any) => { };
  onTouched = (_: any) => { };

  get value(): any { return this.createDate; }

  set value(newValue: any) {
    if (newValue !== this.createDate) {
      this.createDate = newValue;
      this.onChange(newValue);
    }
  }

  writeValue(value: any): void {
    this.createDate = value || null;
  }

  pushChanges(newValue: string) {
    this.createDate = this.onChange(newValue);
  }

  registerOnTouched(fn: (_: any) => {}): void {this.onTouched = fn; }

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
}
