import { Component, OnInit } from '@angular/core';
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
  selector: 'app-listcatagory',
  templateUrl: './listcatagory.component.html',
  styleUrls: ['./listcatagory.component.css']
})
export class ListcatagoryComponent implements OnInit {
  message;
  messageClass;
  typegift: Object;
  dtOptions: DataTables.Settings = {};
  public temp_var: Object=false;
  user = new User();

  constructor(
    private type_giftService: TypeGiftService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

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
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.type_giftService.getAllTypeGift().subscribe(data2 =>{
      this.typegift = data2.listTypegift;
      this.temp_var=true;
      console.log(this.typegift);
    });
  }

}
