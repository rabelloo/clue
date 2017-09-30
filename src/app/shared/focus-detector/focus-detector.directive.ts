import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: 'input,select',
  host: {'(focus)': 'onFocus($event)'}
})
export class FocusDetectorDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer) {}

  onFocus($event) {
    this.renderer.invokeElementMethod(this.elRef.nativeElement, 
        'dispatchEvent', 
        [new CustomEvent('input-focus', { bubbles: true })]);
  }
}