import { AuthServiceService } from './auth-service.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PolicyService {

  domain = this.authService.domain;
  options;

  constructor(
    private http: Http,
    private authService: AuthServiceService

  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  getAll() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + "policy/getall", this.options).map(res => res.json());
  }

  getSingle(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + "policy/" + id, this.options).map(res => res.json());
  }

  add(policy) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + "policy/add", policy, this.options).map(res => res.json());;
  }

  edit(policy) {
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + "policy/edit/", policy, this.options).map(res => res.json());
  }

  deletePolicy(id) {
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + "policy/" + id, this.options).map(res => res.json());
  }
}
