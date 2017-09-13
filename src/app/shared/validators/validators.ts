import { Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export const ClueValidators = {
    in: inValidator,
    range: rangeValidator,
    rangeRequired: rangeRequiredValidator,
    unique: uniqueValidator
}

function inValidator(container: any[]): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors {
        if (!container.includes(control.value))
            return {
                in: false
            };
    }
}

function rangeValidator(min: number, max: number): ValidatorFn {
    return Validators.compose([
        Validators.min(min),
        Validators.max(max)
    ]);
}

function rangeRequiredValidator(min: number, max: number): ValidatorFn {
    return Validators.compose([
        rangeValidator(min, max),
        Validators.required
    ]);
}

function uniqueValidator(container: any[]): ValidatorFn {
    return function (control: AbstractControl): ValidationErrors {
        if (container.includes(control.value))
            return {
                unique: false
            };
    }
}