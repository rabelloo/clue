import { Directive, ElementRef, Renderer } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: 'input,select',
  host: { '(focus)': 'onFocus($event)' }
})
export class FocusDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }
  
  onFocus($event) {
    return bubble('input-focus', this.elRef, this.renderer);
  };
}
