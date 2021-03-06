import { Component, OnInit, Input} from '@angular/core';
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
import { log } from 'util';


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
  userId = 0;
  donHangTrangThai;
  selectedStatus;
  status_Order='XEM_TAT_CA';

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
  RedirectUnregister(){
    this.router.navigate(['/redirectpage'],
    {queryParams: {mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger"}});
  }
  checkRole(){
    this.authService.getProfile().subscribe(profile => {
      if(!profile.user){
        this.RedirectUnregister();
      }else{
        this.user = profile.user;
        this.userId = profile.user._id;
      }
    });
  }
  setStatus(orderid, username) {
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
  getAllOrder() {
    this.orderService.getAllOrder().subscribe(data => {
      this.order = data.listOrder;
      console.log(this.order);
      this.temp_var = true;
    });
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.checkRole();
    this.getAllOrder();
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
  }
