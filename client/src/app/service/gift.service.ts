import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class GiftService {
  domain = this.authService.domain;
  constructor(
    private http: Http,
    private authService: AuthServiceService) { }
  getAllGift() {
    return this.http.get(this.domain + 'gift/allgift').map(res => res.json());
  }
  getGiftId(id) {
    return this.http.get(this.domain + 'gift/allgift/' + id).map(res => res.json());
  }
  getAllGiftByType(id) {
    return this.http.get(this.domain + 'gift/getalltype/' + id + '/allgift').map(res => res.json());
  }
  insertGift(gift) {
    return this.http.post(this.domain + 'gift/allgift', gift).map(res => res.json());
  }
  updateNumberOfGift(gift) {
    return this.http.put(this.domain + 'gift/allgift/editnumberofgift', gift).map(res => res.json());
  }

  editGift(gift) {
    return this.http.put(this.domain + 'gift/allgift/edit/', gift).map(res => res.json());
  }

  deleteGift(id) {
    return this.http.delete(this.domain + 'gift/allgift/' + id).map(res => res.json());
  }
}
