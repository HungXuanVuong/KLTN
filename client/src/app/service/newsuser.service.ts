import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class NewsuserService {

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

    getUserByNewsId(id) {
      this.createAuthenticationHeaders();
      return this.http.get(this.domain + 'newsuser/'+ id, this.options).map(res => res.json());
    }

    editStatusNewsUser(newsuser){
      return this.http.put(this.domain + 'newsuser/edit/', newsuser).map(res =>res.json());
    }

    addNewsUser(newsuser){
      this.createAuthenticationHeaders();
      return this.http.post(this.domain + 'newsuser/add', newsuser, this.options).map(res => res.json());
    }


    getUserInNewsByStatus(id, user){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + 'newsuser/finduserbystatus/'+ id, user, this.options).map(res => res.json());
    }

    // getCandidateInNewsByStatus(id, candidate){
    //   this.createAuthenticationHeaders();
    //   return this.http.put(this.domain + 'newscandidate/findcandidateinnews/'+ id, candidate, this.options).map(res => res.json());
    // }

    getAllNewsUserByIdUser(user){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + 'newsuser/getbyuserid/', user, this.options).map(res => res.json());
    }

    checkUserHaveApplyIntoNews(newsuser){
      this.createAuthenticationHeaders();
      return this.http.put(this.domain + 'newsuser/checkuserapply/', newsuser, this.options).map(res => res.json());
    }
    
}
