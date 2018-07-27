import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: '[clueBlurDetector]',
})
export class BlurDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  @HostListener('blur', ['$event'])
  onBlur($event) {
    return bubble('input-blur', this.elRef, this.renderer);
  }
}
