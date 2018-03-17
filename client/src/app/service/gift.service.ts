import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class GiftService {
  domain = this.authService.domain;
  constructor(
    private http: Http,
    private authService : AuthServiceService) { }
  getAllGift() {
    return this.http.get(this.domain + 'gift/all').map(res => res.json());
  }
}
