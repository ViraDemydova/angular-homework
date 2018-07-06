import { Directive, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  //today = Date.now();
  @Input() appHighlight: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    if (this.appHighlight === 'yellow')
      this.renderer.setStyle(this.el.nativeElement, 'border-color', 'yellow');
  }

}
