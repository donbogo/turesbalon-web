import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  loginForm: FormGroup;
  submittedLogin = false;
  registerForm: FormGroup;
  submittedRegister = false;
  success = false;
  tiposDocumentos: Array<Object> = [
    { id: 'cc', description: 'Cédula de Ciudadanía' },
    { id: 'ce', description: 'Cédula de Extranjería' }];

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
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

  onSubmitLogin(router) {
    this.submittedLogin = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.loginUser(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.submittedLogin = false;
        this.loginForm.reset();
        this.localStorage.setItem('token', res.token);
        this.router.navigate([router]);
      },
      err => { console.error(err) }
    );
  }

  onSubmit() {
    this.submittedRegister = true;
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
    this.submittedRegister = false;
    this.success = false;
    this.registerForm.reset();
    this.registerForm.controls['tipodocumento'].setValue('', { onlySelf: true });
    console.log(this.registerForm);
  }

}
