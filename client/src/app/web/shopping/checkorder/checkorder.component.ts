import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../service/order.service';
import {Order} from '../../../models/order';
import { User } from "../../../models/user";

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-checkorder',
  templateUrl: './checkorder.component.html',
  styleUrls: ['./checkorder.component.css']
})
export class CheckorderComponent implements OnInit {
  message;
  messageClass;
  user: User;
  order: Object;
  order2;


  constructor(
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) { }
  getAllOrder() {
    this.orderService.getAllOrder().subscribe(data => {
      this.order = data.listOrder;
    });
  }
  
  setStatusUser(orderid) {
    this.orderService.getOrderByID(orderid).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.order2 = {
          codeOrder: data.order.codeOrder,
          orderDay: data.order.orderDay,
          receivedDay: data.order.receivedDay,
          placeOfReceipt: data.order.placeOfReceipt,
          product_id: data.order.product_id,
          status: data.order.status,
          employee: data.order.employee
        };
        if (this.order2.status === 'Đã đặt quà') {
          const order_ht = {
            _id: orderid,
            status: 'Đã giao quà'
          };
          console.log(order_ht);
          this.orderService.editStatusAndDay(order_ht).subscribe(data2 => {
            if (!data2.success) {
              this.messageClass = 'alert alert-danger';
              this.message = data2.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = 'Cập nhật trạng thái đơn hàng thành công!';
              this.ngOnInit();
            }
          });
        }
      }
    });
  }
  ngOnInit() {
    this.getAllOrder(); 
    this.authService.getProfile().subscribe(profile => {
      if (profile) {
        this.user = profile.user;
      } else {
        return;
      }
    });  
  }

}
