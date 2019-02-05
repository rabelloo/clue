import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

export const ClueValidators = {
  in: inValidator,
  range,
  rangeRequired,
  unique,
};

function inValidator(container: any[]): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors {
    if (!container.includes(control.value)) {
      return {
        in: false,
      };
    }
  };
}

function range(min: number, max: number): ValidatorFn {
  return Validators.compose([Validators.min(min), Validators.max(max)]);
}

function rangeRequired(min: number, max: number): ValidatorFn {
  return Validators.compose([range(min, max), Validators.required]);
}

function unique(container: any[]): ValidatorFn {
  return function(control: AbstractControl): ValidationErrors {
    if (container.includes(control.value)) {
      return {
        unique: false,
      };
    }
  };
}
