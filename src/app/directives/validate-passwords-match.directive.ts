import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidatePasswordsMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatePasswordsMatchDirective, multi: true}]
})
export class ValidatePasswordsMatchDirective implements Validator {

  @Input('appValidatePasswordsMatch') password: string;

  validate(control: AbstractControl): {[key: string]: any} | null {
    const match = this.password === control.value;
    return !match? {"passwordsNotMatch": {value: control.value}} : null;
  }
}
