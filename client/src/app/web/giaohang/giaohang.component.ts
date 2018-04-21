import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import {Order} from '../../models/order';
import { User } from "../../models/user";

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-giaohang',
  templateUrl: './giaohang.component.html',
  styleUrls: ['./giaohang.component.css']
})
export class GiaohangComponent implements OnInit {
  message;
  messageClass;
  users: Array<User> = [];
  user: User;
  
  processing = false;
  currentUrl;
  loading = true;

  order;
  
    constructor(
      private authService: AuthServiceService,
      private location: Location,
      private activatedRoute: ActivatedRoute,
      private orderService: OrderService,
      private router: Router,
      private _sanitizer: DomSanitizer
  ) { }
 
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.orderService.getOrderByID(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.messageClass = "alert alert-success";
        this.message = " Bạn đã đổi quà thành công!!! Dưới đây là thông tin chi tiết hóa đơn thanh toán!"; 
        this.order = data.order; 
        console.log(this.order);
        this.loading = false; // Allow loading of blog form
      }
    });
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
      }else{
        return;
      }
    });
  }
}
