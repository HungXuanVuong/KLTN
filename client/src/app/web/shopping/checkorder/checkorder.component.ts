import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';
import { GiftService } from '../../../service/gift.service';

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
  processing = false;


  constructor(
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private giftService: GiftService,
    private router: Router
  ) { }
  getAllOrder() {
    this.orderService.getAllOrder().subscribe(data => {
      this.order = data.listOrder;
    });
  }
  
  setStatusUser(orderid,username) {
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
            status: 'Đã giao quà',
            employeeSetStatus: username
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
  setStatusByCancel(orderid, username){
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
          employee: data.order.employee,
          employeeSetStatus: data.order.employeeSetStatus
        };
        if (this.order2.status === 'Đã đặt quà') {
          const order_ht = {
            _id: orderid,
            status: 'Đã hủy đơn quà',
            employeeSetStatus: username
          };
          console.log(order_ht);
          this.orderService.editStatusAndDay(order_ht).subscribe(data2 => {
            if (!data2.success) {
              this.messageClass = 'alert alert-danger';
              this.message = data2.message;
            } else {
                this.messageClass = 'alert alert-success';
              this.ngOnInit();
            }
          });
        }
      }
    });
  }
  quyTrinhHoanDonQua(order_id,employee_id, point_user, product_id, point_qd,gift_cn,username){
    this.giftService.updateNumberOfGift(gift_cn).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        setTimeout(() => {
          this.router.navigate(['/admin/listtransaction']);
        }, 2000);
      } else {
        this.messageClass = 'alert alert-success';
      }
    });
       console.log(gift_cn);

    const user_sd = {
      _id: employee_id,
      point: point_user + point_qd
    };
      this.authService.editPointUser(user_sd).subscribe(data1 => {
        if (!data1.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data1.message;
          this.processing = false;
        } else {
          this.processing = true; // Disable button
          this.messageClass = 'alert alert-success';
          this.setStatusByCancel(order_id,username);
          this.message = 'Hủy đơn quà thành công!';
          this.message += ' Tài khoản người đổi quà vừa được hoàn point tương ứng!';
          this.ngOnInit();
        }
      });
  }
deleteTransaction(order_id,employee_id, point_user, product_id, point_qd,username) {
    if(product_id.status==='Hết quà'){
    const gift_cn1 = {
      _id: product_id,
      amount: product_id.amount
    };
    const gift_ht = {
      _id: product_id,
      status: 'Còn quà'
    };

    this.giftService.editStatus(gift_ht).subscribe(data2 => {
      if (!data2.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data2.message;
      } else {
        this.messageClass = 'alert alert-success';
      }
    });
    this.quyTrinhHoanDonQua(order_id,employee_id, point_user, product_id, point_qd,gift_cn1,username);
   
    }else{
      if(product_id.status==='Còn quà'){
        const gift_cn2 = {
          _id: product_id,
          amount: product_id.amount + 1
        };
        this.quyTrinhHoanDonQua(order_id,employee_id, point_user, product_id, point_qd,gift_cn2,username);
      }
    }

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
    console.log(this.user);
  }

}
