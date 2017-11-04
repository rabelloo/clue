import { Directive, Input, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { distinctUntilChanged, filter, debounceTime, map, startWith, switchMap, defaultIfEmpty, first } from 'rxjs/operators';

import { errorMessages } from './error-messages';

@Directive({
  selector: '[clueErrorMessages]'
})
export class ErrorMessagesDirective implements OnInit {

  @HostBinding('innerHtml') private html: string;
  @Input() private clueErrorMessages: string;
  @Input() private clueReplacements: object;

  private formControl: FormControl;

  constructor(private formGroup: FormGroupDirective) {
  }

  ngOnInit() {
    if (!this.clueErrorMessages) {
      throw new TypeError('clue-error-messages requires the FormControl name for Observable error access. '
                        + 'Please provide the [formControlName] of your target FormControl');
    }

    if (!this.formGroup) {
      throw new TypeError('clue-error-messages requires a FormGroup as a parent for .valueChanges subscription. '
                        + 'Please use it only when nested inside a FormControl');
    }

    this.formControl = this.formGroup.form.get(this.clueErrorMessages) as FormControl;

    if (!this.formControl) {
      throw new TypeError(`clue-error-messages was unable to find a FormControl with name "${this.clueErrorMessages}". `
                        + 'Please make sure your FormGroup has a FormControl with that name');
    }

    this.subscribeToForm();
  }

  private subscribeToForm(): void {
    this.formControl.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(300),
          map(values => this.formControl.errors),
          startWith(this.formControl.errors),
          filter(errors => errors != null),
          switchMap(errors => Object.keys(errors)),
          map(key => errorMessages[key]),
          filter(errorMessage => errorMessage != null),
          defaultIfEmpty(undefined),
        )
        .pipe(
          first(),
        )
        .subscribe(errorMessage => this.html = errorMessage.format(this.clueReplacements));
  }

}
