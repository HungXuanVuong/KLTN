import { Component, OnInit } from '@angular/core';
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
dtOptions: DataTables.Settings = {};
public temp_var: Object=false;
  constructor(
    private authService: AuthServiceService,
    private orderService: OrderService,
    private router: Router
  ) { }

  toggle(id, status){
    if(status === 'Đang chờ'){
      const order_ht={
        _id: id,
        status: "Hoàn thành"
      }
      this.orderService.editStatusAndDay(order_ht).subscribe(data2=>{
        if (!data2.success) {
          this.messageClass = "alert alert-danger";
          this.message += data2.message;
        } else {
          this.messageClass = "alert alert-success";
          this.message += "Cập nhật trạng thái đơn hàng thành công!"; 
          this.getAllOrder();
        }
      });
    } 
  }
  getAllOrder(){
    this.orderService.getAllOrder().subscribe(data =>{
      this.order = data.listOrder;
      this.temp_var=true;
      console.log(this.order);
    });
  }
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllOrder();

  }

}