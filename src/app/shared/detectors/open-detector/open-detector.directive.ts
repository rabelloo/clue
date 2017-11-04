import { Directive, ElementRef, Renderer } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: 'mat-select',
  host: { '(onOpen)': 'onOpen($event)' }
})
export class OpenDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  onOpen($event) {
    return bubble('input-focus', this.elRef, this.renderer);
  };
}
