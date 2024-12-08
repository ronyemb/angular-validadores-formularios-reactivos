import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const product = {
  name: 'Product 1',
  price: 500,
  inStorage: 10
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  public myForm!: FormGroup; // El operador "!" elimina el error.

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      price: [0 , [ Validators.required, Validators.min(0) ]],
      inStorage: [0, [ Validators.required, Validators.min(0) ]]
    });

    // this.myForm.reset(product);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getErrorField(field: string): string {
    if (this.myForm.controls[field].errors?.['required']) {
      return 'Este campo es requerido';
    } else if (this.myForm.controls[field].errors?.['minlength']) {
      return `Minimo ${ this.myForm.controls[field].errors?.['minlength'].requiredLength } caracteres.`;
    }

    return '';
  }

  public onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({ price: 10, inStorage: 0 });
  }
}
