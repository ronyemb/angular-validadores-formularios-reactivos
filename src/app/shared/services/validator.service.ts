import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider: ValidatorFn  = ( control: AbstractControl ): ValidationErrors | null => {
    if ( control.value.trim()?.toLowerCase() === 'strider' ) {
      return { noStrider: true }
    }
    return null;
  };

  public isValidField( form: FormGroup, field: string ): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo( campo1: string, campo2: string ): ValidatorFn {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      // Si los passwords no son iguales
      if ( pass1 !== pass2 ) {
        // Si el objeto errors del campo2 no es nulo
        if (formGroup.get(campo2)?.errors) {
          // Reviso si contiene noIguales, si no, lo añado
          if (!formGroup.get(campo2)?.hasError('noIguales')) {
            const errors = formGroup.get(campo2)?.errors;
            formGroup.get(campo2)?.setErrors({ ...errors, noIguales: true });
          }
        } else {
          //S i el objeto errors es nulo entonces lo agrego
          formGroup.get(campo2)?.setErrors({ noIguales: true });
        }

        // Esta respuesta va a los errores globales del formulario
        return { noIguales: true };
      }

      // Si los passwords son iguales

      // Esta última parte es la solución que subió Franco
      if (formGroup.get(campo2)?.hasError('noIguales')) {
        delete formGroup.get(campo2)?.errors?.['noIguales'];
        formGroup.get(campo2)?.updateValueAndValidity();
      }

      // Esta respuesta va a los errores globales del formulario
      return null;
    }
  }
}
