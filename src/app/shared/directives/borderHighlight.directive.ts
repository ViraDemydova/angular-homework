import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appBorderHighlight]'
})
export class BorderHighlightDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('appBorderHighlight') date: any;

  condition1: any;
  condition2: any;
  currentDate: any;
  freshDate: any;
  creationDate: any;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit() {
    this.currentDate = new Date();
    this.creationDate = new Date(this.date);
    this.freshDate = this.currentDate.getTime() - 14;

   this.condition1 = () => {
        console.log('conditionTest1', this.creationDate.getTime());
        return this.creationDate.getTime() > this.currentDate.getTime() && this.creationDate.getTime() >= this.freshDate ;
    };

    this.condition2 = () => {
      console.log('conditionTest2', this.date <= this.currentDate);
      return this.creationDate.getTime() < this.currentDate.getTime();
   };

    this.highlight(this.date);
  }

  private highlight(date) {
    if (this.condition1()) {
      this.render.setStyle(this.el.nativeElement, 'borderColor', 'blue');
    }  else if (this.condition2()) {
      this.render.setStyle(this.el.nativeElement, 'borderColor', 'green');
    } else {
      this.render.setStyle(this.el.nativeElement, 'borderColor', 'yellow');
    }
  }
}
