import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';
import { TypeGiftService } from '../../../service/type-gift.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GiftService } from '../../../service/gift.service';
import { Gift } from '../../../models/gift';
import { User } from '../../../models/user';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-gau',
  templateUrl: './gau.component.html',
  styleUrls: ['./gau.component.css']
})
export class GauComponent implements OnInit {
  message;
  messageClass;
  users: Array<User> = [];
  user: User;
  type_gift;
  processing = false;
  currentUrl;
  loading = true;

  gift;

  constructor(
    private authService: AuthServiceService,
    private type_giftService: TypeGiftService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private giftService: GiftService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) { }

  RedirectUnregister() {
    this.router.navigate(['/login'],
      { queryParams: { mess: 'Vui lòng đăng nhập thì mới truy cập được chức năng này !', messclas: 'alert alert-danger' } });
  }
  getAllGift(id) { 
    this.giftService.getAllGiftByType(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.gift = data.gift;
        console.log(this.gift);
        this.loading = false; // Allow loading of blog form
        this.getTypeGiftbyID(id);
      }
    });
  }
  getTypeGiftbyID(id){
    this.type_giftService.getDetailTypeGift(id).subscribe(data2 =>{
      if (!data2.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data2.message; // Set error message
      } else {
        this.type_gift = data2.typegift; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });
  }
  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      console.log(params.id);
      // call your function, like getUserInfo()
      this.getAllGift(params.id);
    });
    this.authService.getProfile().subscribe(profile => {
      if (profile) {
        this.user = profile.user;
      } else {
        return;
      }
    });

  }
}
