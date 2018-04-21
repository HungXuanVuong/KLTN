import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class OrderService {

  domain = this.authService.domain;
  options;
  
  constructor(
    private http: Http,
    private authService : AuthServiceService
  ) { }

  getAllOrder() {
    return this.http.get(this.domain + 'order/getall', this.options).map(res => res.json());
  }

  getOrderByID(id){
    return this.http.get(this.domain + 'order/' + id).map( res => res.json());
  }

  addOrder(order){
    return this.http.post(this.domain + "order/add", order, this.options).map(res => res.json());
  }

  editOrder(order){
    return this.http.put(this.domain + 'order/edit/', order, this.options).map(res => res.json());
  }
  
  deleteOrder(id){
    return this.http.delete(this.domain + 'order/' + id, this.options).map(res => res.json());
  }

  editStatusAndDay(order){
    return this.http.put(this.domain + 'order/editstatus', order).map(res => res.json());
  }
  
}
