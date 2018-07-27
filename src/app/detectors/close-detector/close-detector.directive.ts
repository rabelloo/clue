import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: '[clueCloseDetector]',
})
export class CloseDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  @HostListener('onClose', ['$event'])
  onClose($event) {
    return bubble('input-blur', this.elRef, this.renderer);
  }
}
