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
  order_sdq;

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
    this.GiftService.getGiftId(this.currentUrl.id).subscribe(data => {
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
      if (profile) {
        this.user = profile.user;
      }else {
        return;
      }
    });
  }
  quyDoi(e_id, pointuser, p_id, amountproduct, pointproduct) {
    this.processing = true;
    const gift1 = {
          _id:  p_id,
          amount: amountproduct - 1
    };
    this.GiftService.updateNumberOfGift(gift1).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        setTimeout(() => {
          this.router.navigate(['/shopping/tatca']);
        }, 2000);
      } else {
        this.messageClass = 'alert alert-success';
        this.gift = data.gift1;
        console.log(this.gift);
      }
    });
    const order = {
      placeOfReceipt: 'Quầy lễ tân gần cửa ra vào, tầng G, tòa nhà FPT Software',
      product_id: p_id,
      employee: e_id
    };
    this.OrderService.addOrder(order).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Đã có sự cố xảy ra!!! Giao dịch đổi quà không thành công';
        this.processing = false;
        setTimeout(() => {
          this.router.navigate(['/shopping/tatca']);
        }, 2000);
      } else {
        this.messageClass = 'alert alert-success';
        this.message = 'Đổi quà thành công!';
        this.order_sdq = data.order;
        console.log(this.order_sdq);
      }
    });
    const user_sd = {
      _id: e_id,
      point: pointuser - pointproduct
    };
    this.authService.editPointUser(user_sd).subscribe(data2 => {
      if (!data2.success) {
        this.messageClass = 'alert alert-danger';
        this.message += data2.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message += ' Tài khoản của bạn đã bị trừ trương ứng với số point vừa đổi!';
        setTimeout(() => {
          this.router.navigate(['/giaohang/' + this.order_sdq._id]);
        }, 2000);
      }
    });
  }
}
