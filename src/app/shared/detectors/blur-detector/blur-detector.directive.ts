import { Directive, ElementRef, Renderer } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: 'input,select',
  host: { '(blur)': 'onBlur($event)' }
})
export class BlurDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }
  
  onBlur($event) {
    return bubble('input-blur', this.elRef, this.renderer);
  };
}
