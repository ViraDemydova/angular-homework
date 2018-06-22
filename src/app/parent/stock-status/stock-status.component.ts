import {Component, Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';

@Component({
  selector: 'app-stock-status',
  templateUrl: './stock-status.component.html',
  styleUrls: ['./stock-status.component.css']
})
export class StockStatusComponent implements OnInit, OnChanges {
  @Input() stock: number; // the value of these two properties will be passed from AppComponent(Parent).
  @Input() productId: number; // the value of these two properties will be passed from AppComponent(Parent).
  @Output() stockValueChange = new EventEmitter(); // This event will be emitted to AppComponent on the click of the button.
  color = '';
  updatedstockvalue: number;

  stockValueChanged() {
    this.stockValueChange.emit({ id: this.productId, updatdstockvalue: this.updatedstockvalue });
    this.updatedstockvalue = null;
  }

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() { // each time the stock value gets updated in the AppComponent, the value of the color property should be updated.
    if (this.stock > 10) {
      this.color = 'green';
    } else {
      this.color = 'red';
    }
  }
}
