import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidateEmailDirective, multi: true}]
})
export class ValidateEmailDirective implements Validator {
  
  validate(control: AbstractControl): {[key: string]: any} | null {
      const valid = new RegExp("(?:@buffs.wtamu.edu$|@wtamu.edu$)").test(control.value);
      return !valid ? {'invalidEmail': {value: control.value}} : null;
  }
}
