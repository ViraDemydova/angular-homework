
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
  @Input('appBorderHighlight') color: string;

  constructor(private el: ElementRef, private render: Renderer2) {}

  ngOnInit() {
    this.highlight(this.color || '#b7adcf');
  }

  private highlight(color: string) {
    this.render.setStyle(this.el.nativeElement, 'borderColor', color);
  }
}
