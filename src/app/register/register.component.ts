import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  success = false;
  tiposDocumentos: Array<Object> = [
    { id: 'cc', description: 'Cédula de Ciudadanía' },
    { id: 'ce', description: 'Cédula de Extranjería' }];

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      tipodocumento: ['', Validators.required],
      numerodocumento: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
    this.registerForm.controls['tipodocumento'].setValue('', { onlySelf: true });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.success = false;
    if (!this.registerForm.invalid) {
      this.auth.registrarUser(this.registerForm.value).subscribe(
        res => {
          console.log(res);
          this.reset();
        },
        err => { console.error(err) }
      );
    }
  }

  reset() {
    this.submitted = false;
    this.success = false;
    this.registerForm.reset();
    this.registerForm.controls['tipodocumento'].setValue('', { onlySelf: true });
    console.log(this.registerForm);
  }
}
