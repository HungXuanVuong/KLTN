import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';

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

  processing = false;
  currentUrl;
  loading = true;

  gift;

  constructor(
    private authService: AuthServiceService,
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
