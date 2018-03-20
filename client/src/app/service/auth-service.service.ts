import { Injectable } from '@angular/core';

import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthServiceService {

  domain = environment.domain;

  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken() {
    this.authToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }
  
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  registerUser(user) {
    return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
  }
  registerUserWithEmail(user) {
    return this.http.post(this.domain + 'authentication/registerwithMail', user).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
  }
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
   
  }
  getAllUser() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/user/getall').map(res => res.json());
  }

  getTop4User() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/user/gettop4').map(res => res.json());
  }

  changePassword(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/edit/', user, this.options).map(res => res.json());
  }

  findUserById(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/user/' + id, this.options).map(res => res.json());
  }
}
