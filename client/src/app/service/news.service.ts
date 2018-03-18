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
  
}
