import { Component, OnInit} from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { AuthServiceService } from '../../../service/auth-service.service';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listtransaction',
  templateUrl: './listtransaction.component.html',
  styleUrls: ['./listtransaction.component.css']
})

export class ListtransactionComponent implements OnInit {
  message;
  messageClass;
  loadingBlogs = false;
order: Object;
order2;
dtOptions: DataTables.Settings = {};
public temp_var: Object = false;
  constructor(
    private authService: AuthServiceService,
    private orderService: OrderService,
    private router: Router
  ) { }
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
        if (this.order2.status === 'Đổi quà thành công') {
          const order_ht = {
            _id: orderid,
            status: 'Giao hàng thành công'
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
  }

}
