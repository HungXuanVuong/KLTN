import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class NewsService {

  domain = this.authService.domain;

  constructor(
    private http: Http,
    private authService : AuthServiceService
  ) { }

  getAllNews() {
    return this.http.get(this.domain + 'news/getall').map(res => res.json());
  }
  getTop6News() {
    return this.http.get(this.domain + 'news/gettop6').map(res => res.json());
  }

  getSingleNews(id){
    return this.http.get(this.domain + 'news/news/' + id).map( res => res.json());
  }
}
