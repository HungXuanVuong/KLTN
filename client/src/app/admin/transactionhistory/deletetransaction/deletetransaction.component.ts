import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { GiftService } from '../../../service/gift.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';
import { AuthServiceService } from '../../../service/auth-service.service';
import {User} from '../../../models/user';
import {Gift} from '../../../models/gift';

@Component({
  selector: 'app-deletetransaction',
  templateUrl: './deletetransaction.component.html',
  styleUrls: ['./deletetransaction.component.css'],
  animations: [routerTransition()]
})
export class DeletetransactionComponent implements OnInit {
  message;
  messageClass;
  foundOrder= false;
  processing = false;
  order;
  gift = new Gift();
  currentUrl;
  user: User;

  constructor(
    private authService: AuthServiceService,
    private orderService: OrderService,
    private giftService: GiftService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.orderService.getOrderByID(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.order = {
          codeOrder: data.order.codeOrder,
          productName: data.order.product_id.product_name,
          point_qd: data.order.product_id.point_sp,
          orderDay: data.order.orderDay,
          receivedDay: data.order.receivedDay,
          placeOfReceipt: data.order.placeOfReceipt,
          product_id: data.order.product_id,
          status: data.order.status,
          employee: data.order.employee
        };
        this.foundOrder = true;
        console.log(data.order.product_id.amount);
      }
    });
    this.authService.getProfile().subscribe(profile => {
      if (profile) {
        this.user = profile.user;
      }else {
        return;
      }
    });
  }
  deleteTransaction(employee_id, point_u, product_id, point_qd) {
    const gift_cn = {
      _id: product_id,
      amount: this.order.product_id.amount + 1
    };
    this.giftService.updateNumberOfGift(gift_cn).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        setTimeout(() => {
          this.router.navigate(['/shopping/tatca']);
        }, 2000);
      } else {
        this.messageClass = 'alert alert-success';
      }
    });

  console.log(gift_cn);
    const user_sd = {
      _id: employee_id,
      point: point_u + point_qd
    };
      this.authService.editPointUser(user_sd).subscribe(data1 => {
        if (!data1.success) {
          this.messageClass = 'alert alert-danger';
          this.message = data1.message;
          this.processing = false;
        } else {
          this.processing = true; // Disable button
          this.orderService.deleteOrder(this.currentUrl.id).subscribe(data2 => {
            // check yeu cau xoa
            if (!data2.success) {
              this.messageClass = 'alert alert-danger';
              this.message = 'data2.message';
            }else {
              this.messageClass = 'alert alert-success';
              this.message = data2.message;
              this.message += ' Tài khoản người đổi quà vừa được hoàn point tương ứng!';
              setTimeout(() => {
                this.router.navigate(['/admin/listtransaction']);
              }, 2000);
            }
          });
        }
      });
    }
  }


