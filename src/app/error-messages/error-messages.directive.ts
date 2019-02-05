import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
} from 'rxjs/operators';
import { errorMessages } from './error-messages';

@Directive({
  selector: '[clueErrorMessages]',
})
export class ErrorMessagesDirective implements OnInit {
  @Input() clueErrorMessages: string;
  @Input() clueReplacements: object;

  @HostBinding('innerHtml') private html: string;
  private formControl: FormControl;

  constructor(private formGroup: FormGroupDirective) {}

  ngOnInit() {
    if (!this.clueErrorMessages) {
      throw new TypeError(
        'clue-error-messages requires the FormControl name for Observable error access. ' +
          'Please provide the [formControlName] of your target FormControl'
      );
    }

    if (!this.formGroup) {
      throw new TypeError(
        'clue-error-messages requires a FormGroup as a parent for .valueChanges subscription. ' +
          'Please use it only when nested inside a FormControl'
      );
    }

    this.formControl = this.formGroup.form.get(
      this.clueErrorMessages
    ) as FormControl;

    if (!this.formControl) {
      throw new TypeError(
        `clue-error-messages was unable to find a FormControl with name "${
          this.clueErrorMessages
        }". ` +
          'Please make sure your FormGroup has a FormControl with that name'
      );
    }

    this.subscribeToForm();
  }

  private subscribeToForm(): void {
    this.formControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        startWith(this.formControl.errors),
        map(_ => this.formControl.errors),
        filter(errors => errors != null),
        map(errors => Object.keys(errors)[0]),
        map(key => errorMessages[key]),
        filter(errorMessage => errorMessage != null)
      )
      .subscribe(errorMessage => {
        this.html = errorMessage.format(this.clueReplacements);
      });
  }
}
