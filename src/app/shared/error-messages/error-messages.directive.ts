import { Directive, Input, HostBinding } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { errorMessages } from './error-messages';

@Directive({
  selector: '[clueErrorMessages]'
})
export class ErrorMessagesDirective {

  @HostBinding('innerHtml') private html: string
  @Input() private clueErrorMessages: string
  @Input() private clueReplacements: object

  private formControl: FormControl;

  constructor(private formGroup: FormGroupDirective) {
  }

  ngOnInit() {
    if (!this.clueErrorMessages)
      throw new TypeError('clue-error-messages requires the FormControl name for Observable error access. '
                        + 'Please provide the the [formControlName] of your targeted FormControl');

    this.formControl = this.formGroup.form.controls[this.clueErrorMessages] as FormControl;
    this.subscribeToForm();
  }

  private subscribeToForm(): void {
    this.formControl.valueChanges
        .distinctUntilChanged()
        .debounceTime(300)
        .map(values => this.formControl.errors)
        .startWith(this.formControl.errors)
        .filter(errors => errors != null)
        .switchMap(errors => Object.keys(errors))
        .map(key => errorMessages[key])
        .filter(errorMessage => errorMessage != null)
        .defaultIfEmpty(undefined)
        .first()
        .subscribe(errorMessage => this.html = errorMessage.format(this.clueReplacements))
  }

}
