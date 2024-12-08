import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validator.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorsService,
    private emailValidator: EmailValidatorService
  ) {
    this.myForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.pattern(
              this.validatorService.firstNameAndLastnamePattern
            ),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validatorService.emailPattern),
          ],
          [this.emailValidator],
        ],
        username: [
          '',
          [Validators.required, this.validatorService.cantBeStrider],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
      }
      ,{
        validators: [
          this.validatorService.isFieldOneEqualFieldTwo( 'password', 'password2')
        ]
      }
    );

    // this.myForm.setValidators(
    //   this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
    // );
  }

  public isValidField(field: string): boolean | null {
    return this.validatorService.isValidField(this.myForm, field);
  }

  public onSubmit(): void {
    this.myForm.markAllAsTouched();
  }
}
