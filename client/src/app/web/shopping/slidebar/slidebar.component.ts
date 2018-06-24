import { Component, OnInit } from '@angular/core';
import { TypeGiftService } from '../../../service/type-gift.service'; 
import { GiftService } from '../../../service/gift.service';
import { AuthServiceService } from '../../../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {
  gift;
  typegift;
  loading = false;
  user: User;
  
  constructor(
    private authService: AuthServiceService,
    private typegiftService: TypeGiftService,
    private giftService: GiftService,
    private router: Router
  ) { }
 
  
  ngOnInit() {
    this.typegiftService.getAllTypeGift().subscribe(data1 =>{
      this.typegift = data1.listTypegift;
      console.log(this.typegift);
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
