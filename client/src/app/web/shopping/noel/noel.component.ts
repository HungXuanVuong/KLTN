import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../../service/auth-service.service';
import { GiftService } from '../../../service/gift.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-noel',
  templateUrl: './noel.component.html',
  styleUrls: ['./noel.component.css']
})
export class NoelComponent implements OnInit {
  gift;
  user: User;

  constructor(
    private authService: AuthServiceService,
    private giftService: GiftService,
    private router: Router,
  ) { }

  RedirectUnregister() {
    this.router.navigate(['/login'],
      { queryParams: { mess: 'Vui lòng đăng nhập thì mới truy cập được chức năng này !', messclas: 'alert alert-danger' } });
  }
  ngOnInit() {
    this.giftService.getAllGift().subscribe(data1 => {
      this.gift = data1.listGift;
      console.log(this.gift);
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
