import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: '[clueOpenDetector]',
})
export class OpenDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  @HostListener('onOpen', ['$event'])
  onOpen($event) {
    return bubble('input-focus', this.elRef, this.renderer);
  }
}
