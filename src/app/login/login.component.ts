import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any, private auth: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(router) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.loginUser(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        this.submitted = false;
        this.loginForm.reset();
        this.localStorage.setItem('token', res.token);
        this.router.navigate([router]);
      },
      err => { console.error(err) }
    );
  }

}
