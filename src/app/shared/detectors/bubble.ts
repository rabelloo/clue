import { ElementRef, Renderer } from "@angular/core";

export function bubble(eventType: string, elRef: ElementRef, renderer: Renderer) {
  renderer.invokeElementMethod(
    elRef.nativeElement,
    'dispatchEvent',
    [new CustomEvent(eventType, { bubbles: true })]
  );
}
