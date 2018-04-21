import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';

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
  currentUrl;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  deleteTransaction(){
    this.processing = true; // Disable button
    this.orderService.deleteOrder(this.currentUrl.id).subscribe(data =>{
      // check yeu cau xoa
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/admin/listtransaction']);
        }, 2000);
      }
    });
  }


  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.orderService.getOrderByID(this.currentUrl.id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.order = {
          codeOrder: data.order.codeOrder,
          productName: data.order.productName,
          point_qd: data.order.point_qd,
          orderDay: data.order.orderDay,
          receivedDay: data.order.receivedDay,
          placeOfReceipt: data.order.placeOfReceipt,
          status: data.order.status,
          employee: data.order.employee
        }
        this.foundOrder = true;
      }
    });
  }
}

