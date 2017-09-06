import { Directive, Input, HostBinding } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { errorMessages } from './error-messages';

@Directive({
  selector: '[clueErrorMessages]'
})
export class ErrorMessagesDirective {

  @HostBinding('innerHtml') private html: string;
  @Input() private clueErrorMessages: string;

  private formControl: FormControl;
  private setErrorMessage = errorMessage => this.html = errorMessage;

  constructor(private formGroup: FormGroupDirective) {
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
          .subscribe(this.setErrorMessage);
  }

  private subscribeToForm(): void {
    this.firstErrorMessageOf(
      this.formControl.valueChanges
                      .distinctUntilChanged()
                      .debounceTime(300)
                      .map(values => this.formControl.errors))
          .subscribe(this.setErrorMessage);
  }

}
