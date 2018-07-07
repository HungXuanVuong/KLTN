import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../../service/gift.service';
import { TypeGiftService } from '../../../service/type-gift.service';
import { AuthServiceService } from "../../../service/auth-service.service";
import { User } from "../../../models/user";
import { Router } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  message;
  messageClass;
  listgift: Object;
  dtOptions: DataTables.Settings = {};
  public temp_var: Object= false;
  listtypegift;
  giftbytype;
  status_Product='XEM_TAT_CA';
  user = new User();

  constructor(
    private giftService: GiftService,
    private type_giftService: TypeGiftService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  getAllType() {
    this.type_giftService.getAllTypeGift().subscribe(data => {
      this.listtypegift = data.listTypegift;
    });
  }

  getAllGift() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.giftService.getAllGift().subscribe(data => {
      this.listgift = data.listGift;
      this.temp_var = true;
      console.log(this.listgift);
    });
  }

  selectPBHandle(event: any) {
    this.giftbytype = event.target.value;
    console.log(this.giftbytype);
  }
  // tslint:disable-next-line:member-ordering
  selectedTypegift;
  refeshPage() {
    this.selectedTypegift = null;
  }

  RedirectUnregister() {
    this.router.navigate(['/redirectpage'],
      { queryParams: { mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger" } });
  }
  checkRole() {
    this.authService.getProfile().subscribe(profile => {
      if (!profile.user) {
        this.RedirectUnregister();
      } else {
        this.user = profile.user;
      }
    });
  }

  ngOnInit() {
    this.checkRole();
    this.getAllGift();
    this.getAllType();
  }

}
