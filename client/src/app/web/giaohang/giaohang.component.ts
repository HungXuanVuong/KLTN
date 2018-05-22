import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form : FormGroup;
  message;
  messageClass;
  users: Array<User> = [];
  user: User;
  
  processing = false;
  currentUrl;
  loading = true;

  order;
  
    constructor(
      private formBuilder: FormBuilder,
      private location: Location,
      private activatedRoute: ActivatedRoute,
      private orderService: OrderService,
      private router: Router,
      private _sanitizer: DomSanitizer
  ) { }
  disableForm() {
    this.form.controls['comment'].disable();
  }

  enableForm(){
    this.form.controls['comment'].enable();
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`  
    <html>
        <head>
          <title>In hóa đơn</title>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
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
  }
}
