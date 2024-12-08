import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

  public myForm!: FormGroup;
  public person = {
    gender: 'F',
    wantNotifications: true
  }

  constructor( private fb: FormBuilder ) {}
  ngOnInit(): void {
    this.myForm = this.fb.group({
      gender: ['M', Validators.required],
      wantNotifications: [false],
      termsAndConditions: [false, Validators.requiredTrue]
    })

    this.myForm.reset(this.person);
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
    this.myForm.reset();
  }

  public isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

}
