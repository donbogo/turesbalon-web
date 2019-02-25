import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrarUrl = 'https://reqres.in/api/users';
  private loginUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  registrarUser(usuario) {
    console.log('usuario', usuario);
    return this.http.post<any>(this.registrarUrl, { "name": "morpheus", "job": "leader" });
  }

  loginUser(usuario) {
    console.log('usuario', usuario);
    return this.http.post<any>(this.loginUrl, { "email": "peter@klaven", "password": "cityslicka" });
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

}
