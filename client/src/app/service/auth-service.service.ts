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

  resetPasswordSendMail(email){
    return this.http.put(this.domain + 'authentication/resetpassword', email).map(res => res.json());
  }

  checkUsername(username) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
  }

  checkExitsEmail(email){
    return this.http.get(this.domain+ 'authentication/checkExitsEmail/' + email).map(res => res.json());
  }
  checkExitsPass(user) {
    return this.http.post(this.domain + 'authentication/checkExitsPass', user).map(res => res.json());
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

  getTop5User() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/user/gettop5').map(res => res.json());
  }

  changePassword(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/edit/', user, this.options).map(res => res.json());
  }

  findUserById(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/user/' + id, this.options).map(res => res.json());
  }
  editAvatarUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/user/editavatar/', user, this.options).map(res => res.json());
  }

  editUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/update/', user, this.options).map(res => res.json());
  }

  editPointUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/user/editpoint', user).map(res => res.json());
  }

  editPointSignUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/user/editpointsign', user).map(res => res.json());
  }

  lockUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/user/lockuser', user).map(res => res.json());
  }

  unLockUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/user/unlockuser', user).map(res => res.json());
  }

  editRoleUser(user){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'authentication/user/editrole', user).map(res => res.json());
  }
}
