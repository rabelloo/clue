import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';

import { bubble } from '../bubble';

@Directive({
  selector: '[clueFocusDetector]',
})
export class FocusDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) { }

  @HostListener('focus', ['$event'])
  onFocus($event) {
    return bubble('input-focus', this.elRef, this.renderer);
  }
}
