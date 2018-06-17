import { Component, OnInit} from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { GiftService } from '../../../service/gift.service';
import { AuthServiceService } from '../../../service/auth-service.service';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';
import {User} from '../../../models/user';
import {Gift} from '../../../models/gift';

@Component({
  selector: 'app-listtransaction',
  templateUrl: './listtransaction.component.html',
  styleUrls: ['./listtransaction.component.css']
})

export class ListtransactionComponent implements OnInit {
  message;
  messageClass;
  foundOrder= false;
  processing = false;
  order: Object;
  order2;
  dtOptions: DataTables.Settings = {};
  public temp_var: Object = false;
  gift;
  user: User;
  donHangTrangThai;
  selectedStatus;

  constructor(
    private authService: AuthServiceService,
    private orderService: OrderService,
    private giftService: GiftService,
    private router: Router
  ) { }
  
  selectStatusHandle(event: any){
    this.donHangTrangThai = event.target.value;
    console.log(this.donHangTrangThai);
  }
  setStatus(orderid) {
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

  getAllOrder() {
    this.orderService.getAllOrder().subscribe(data => {
      this.order = data.listOrder;
      this.temp_var = true;
    });
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.getAllOrder();
    this.authService.getProfile().subscribe(profile => {
      if (profile) {
        this.user = profile.user;
      }else {
        return;
      }
    });
  }
deleteTransaction(order_id,employee_id, point_user, product_id, point_qd) {
    const gift_cn = {
      _id: product_id,
      amount: product_id.amount + 1
    };
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
          this.orderService.deleteOrder(order_id).subscribe(data2 => {
            // check yeu cau xoa
            if (!data2.success) {
              this.messageClass = 'alert alert-danger';
              this.message = 'data2.message';
            }else {
              this.messageClass = 'alert alert-success';
              this.message = 'Hủy đơn quà thành công!';
              this.message += ' Tài khoản người đổi quà vừa được hoàn point tương ứng!';
              this.ngOnInit();
            }
          });
        }
      });
    }
  }
