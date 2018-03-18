import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class TypeGiftService {
  domain = this.authService.domain;

  constructor(
    private http: Http,
    private authService : AuthServiceService) { }
    
    getAllTypeGift() {
      return this.http.get(this.domain + 'typegift/getalltype').map(res => res.json());
    }
    getDetailTypeGift(id){
      return this.http.get(this.domain + 'typegift/getalltype' + id).map(res => res.json());
    }
    addTypeGift(typegift){
      return this.http.post(this.domain + 'typegift/getalltype', typegift).map(res => res.json());
    }
  
    editTypeGift(typegift){
      return this.http.put(this.domain + 'typegift/getalltype/edit/', typegift).map(res => res.json());
    }
  
    deleteTypeGift(id){
      return this.http.delete(this.domain + 'typegift/getalltype/' + id).map(res => res.json());
    }
  
}
