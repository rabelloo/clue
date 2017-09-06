import { Directive, Input, Host, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { errorMessages } from './error-messages';

@Directive({
  selector: '[clueErrorMessages]'
})
export class ErrorMessagesDirective {

  @Input() private clueErrorMessages: string;
  private formControl: FormControl;

  private set errorMessage(value: string) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', value);
  }

  constructor(@Host() private formGroup: FormGroupDirective,
                      private elementRef: ElementRef,
                      private renderer: Renderer2) {
  }

  ngOnInit() {
    if (!this.clueErrorMessages)
      throw new TypeError('clue-error-messages requires the FormControl name for Observable error access. '
                        + 'Please provide the the [formControlName] of your targeted FormControl');

    this.formControl = this.formGroup.form.controls[this.clueErrorMessages] as FormControl;
    this.subscribeToForm();
    this.initError();
  }

  private firstErrorMessageOf(observable: Observable<{[key: string]: string}>): Observable<string> {
    return observable
            .filter(errors => errors != null)
            .switchMap(errors => Object.keys(errors))
            .map(key => errorMessages[key])
            .filter(errorMessage => errorMessage != null)
            .defaultIfEmpty(undefined)
            .first();
  }

  private initError() {
    this.firstErrorMessageOf(
      Observable.of(this.formControl.errors))
          .subscribe(errorMessage => this.errorMessage = errorMessage);
  }

  private subscribeToForm(): void {
    this.firstErrorMessageOf(
      this.formControl.valueChanges
                      .distinctUntilChanged()
                      .debounceTime(300)
                      .map(values => this.formControl.errors))
          .subscribe(errorMessage => this.errorMessage = errorMessage);
  }

}
