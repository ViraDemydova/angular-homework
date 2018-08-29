import {Component, forwardRef, OnInit} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TimeControlComponent), multi: true }
  ]
})
export class TimeControlComponent implements OnInit {
  duration: any;
  propagateChange = (_: any) => {};
  onChange = (_: any) => { };

  constructor() {}

  ngOnInit() {
  }

  writeValue(value: any) {
    this.duration = value || null;
  }

  pushChanges(newValue: any) {
    this.duration = this.onChange(newValue);
  }

  registerOnTouched() {}

  registerOnChange(fn: (_: any) => {}) { this.onChange = fn; }

}
