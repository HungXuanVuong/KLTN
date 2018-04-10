import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../service/gift.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AuthServiceService } from '../../service/auth-service.service';
import { OrderService } from '../../service/order.service';
import {Gift} from '../../models/gift';
import {User} from '../../models/user';
import {Order} from '../../models/order';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css'],
  animations: [routerTransition()]
})
export class GiohangComponent implements OnInit {
  message;
  messageClass;
  
  processing = false;
  currentUrl;
  loading = true;
  foundGift = false;
  point_sd;

  gift = new Gift();
  user: User;

  constructor(
    private authService: AuthServiceService,
    private OrderService: OrderService,
    private GiftService: GiftService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.GiftService.getGiftId(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.gift = data.gift; 
        console.log(this.gift);
        this.loading = false; // Allow loading of blog form
        this.foundGift = true;
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
  quyDoi(e_id){
    this.processing = true;
    const order = {
      productName: this.gift.product_name,
      point_qd: this.gift.point_sp,
      placeOfReceipt: "Quầy lễ tân gần cửa ra vào, tầng G, tòa nhà FPT Software",
      employee: e_id
    }
    //console.log(order);
    this.OrderService.addOrder(order).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = "alert alert-success";
        this.message = "Đổi quà thành công!";
        setTimeout(() =>{
          this.router.navigate(['/giaohang']);
        }, 2000);
      }
    });
  }

}
