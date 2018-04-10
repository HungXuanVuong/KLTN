import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../service/auth-service.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftService } from '../../../service/gift.service';
import {Gift} from '../../../models/gift';
import { User } from "../../../models/user";

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chitietsp',
  templateUrl: './chitietsp.component.html',
  styleUrls: ['./chitietsp.component.css']
})
export class ChitietspComponent implements OnInit {
  message;
  messageClass;
  users: Array<User> = [];
  user: User;
  
  processing = false;
  currentUrl;
  loading = true;

  gift = new Gift();


  constructor(
    private authService: AuthServiceService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private giftService: GiftService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) { }
  RedirectUnregister(){
    this.router.navigate(['/login'],
    {queryParams: {mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger"}});
  }
  ngOnInit() {
        
        this.currentUrl = this.activatedRoute.snapshot.params;
        this.giftService.getGiftId(this.currentUrl.id).subscribe(data =>{
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
}
