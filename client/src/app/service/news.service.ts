import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class NewsService {

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

  getAllNews() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'news/getall', this.options).map(res => res.json());
  }
  getTop6News() {
    return this.http.get(this.domain + 'news/gettop6').map(res => res.json());
  }

  getSingleNews(id){
    return this.http.get(this.domain + 'news/' + id).map( res => res.json());
  }

  addNews(news){
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + "news/add", news, this.options).map(res => res.json());
  }

  editNews(news){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'news/edit/', news, this.options).map(res => res.json());
  }
  
  
  editStatusNews(news){
    this.createAuthenticationHeaders();
    return this.http.put(this.domain + 'news/editstatus/', news, this.options).map(res => res.json());
  }

  deleteNews(id){
    this.createAuthenticationHeaders();
    return this.http.delete(this.domain + 'news/' + id, this.options).map(res => res.json());
  }
  
}
