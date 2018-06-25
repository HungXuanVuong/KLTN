import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class NewscandidateService {

  domain = this.authService.domain;
  options;

  constructor(
    private http: Http,
    private authService : AuthServiceService
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

  getCandidteByNewsId(id) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'newscandidate/candidate/'+ id, this.options).map(res => res.json());
  }

  getCandidateByUserId(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'newscandidate/candidateuser/'+ id, this.options).map(res => res.json());
  }

  editStatusNewsCandidate(newscandidate){
    return this.http.put(this.domain + 'newscandidate/edit/', newscandidate).map(res =>res.json());
  }

  checkEmail(idNews, email){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'newscandidate/checkEmailCandidate/'+idNews+'/'+email, this.options).map(res => res.json());
  }

  checkPhone(idNews, phone){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'newscandidate/checkPhoneCandidate/'+idNews+'/'+phone, this.options).map(res => res.json());
  }

  addNewsCandidate(newscandidate){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + 'newscandidate/add', newscandidate, this.options).map(res => res.json());
  }

  getNewsCandidateById(id){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'newscandidate/'+ id, this.options).map(res => res.json());
  }

  getAllNewsCandidate(){
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'newscandidate/getall', this.options).map(res => res.json());
  }
}
