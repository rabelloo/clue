import { Directive, ElementRef, Renderer } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: 'mat-select',
  host: { '(onClose)': 'onClose($event)' }
})
export class CloseDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }
  
  onClose($event) {
    return bubble('input-blur', this.elRef, this.renderer);
  };
}
