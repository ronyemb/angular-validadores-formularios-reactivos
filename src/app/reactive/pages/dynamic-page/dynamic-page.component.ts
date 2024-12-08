import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent implements OnInit {

  public myForm!: FormGroup;
  public newFavoriteGame: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder ) { }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(3) ]],
      favoriteGames: this.fb.array([
        ['Metal Gear', Validators.required],
        ['Death Stranding', Validators.required]
      ], [ Validators.required, Validators.minLength(1) ]),
      inStorage: [0]
    });
  }

  public get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray).clear();
    this.myForm.reset();
  }

  public onDeleteFavoriteGame( index: number ): void {
    this.favoriteGames.removeAt(index);
  }

  public addFavoriteGame(): void {
    if (this.newFavoriteGame.invalid) {
      this.newFavoriteGame.markAsTouched();
      return;
    }
    const newGame = this.newFavoriteGame.value;
    this.favoriteGames.push( this.fb.control(newGame, Validators.required) );
    this.newFavoriteGame.reset();
  }

  public isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  public getFieldError( field: string ): string {
    if (this.myForm.controls[field].errors?.['required']) {
      return 'Este campo es requerido';
    } else if (this.myForm.controls[field].errors?.['minlength']) {
      return `Minimo ${ this.myForm.controls[field].errors?.['minlength'].requiredLength } caracteres.`;
    }

    return '';
  }

  public isValidFieldInArray( formArray: FormArray, index: number ): boolean | null {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }

public isValidNewFavoriteGame(): boolean | null {
  return this.newFavoriteGame.errors && this.newFavoriteGame.touched;
}
}
