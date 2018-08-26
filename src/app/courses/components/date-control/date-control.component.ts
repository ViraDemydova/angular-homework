import {Component, forwardRef, Input, OnChanges, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import { FormsModule, NG_ASYNC_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DateControlComponent), multi: true }
  ]
})

export class DateControlComponent implements ControlValueAccessor, OnInit {
  createDate: FormControl;
  propagateChange = (_: any) => {};
  onChange = (_: any) => { };

  constructor() {
    //this.validator = this.dateValidator();
  }

  ngOnInit() {
  }

  writeValue(value: any): void {
    this.createDate = value || null;
  }

  pushChanges(newValue: string) {
    this.createDate = this.onChange(newValue);
   // this.validator = dateValidator(this.createDate);
  }

  registerOnTouched() {}

  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }

}
