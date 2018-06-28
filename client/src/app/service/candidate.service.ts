import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class CandidateService {
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

    getAllCandidate(){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'candidate/getall', this.options).map(res => res.json());
    }

    getSingleCandidate(id){
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'candidate/'+id, this.options).map(res => res.json());
    }

    addCandidate(candidate){
      this.createAuthenticationHeaders();
      return this.http.post(this.domain + 'candidate/add', candidate, this.options).map(res => res.json());
    }

    deleteCandidate(id){
      this.createAuthenticationHeaders();
      return this.http.delete(this.domain + 'candidate/'+id, this.options).map(res => res.json());
    }

    editCandidate(candidate){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + 'candidate/edit/', candidate, this.options).map(res => res.json());
    }

    getTop5Candidate() {
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'candidate/gettop5').map(res => res.json());
    }

}
