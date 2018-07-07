import { PolicyService } from './../../../service/policy.service';
import { Policy } from './../../../models/policy';
import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user";
import { Router } from '@angular/router';
import { AuthServiceService } from "../../../service/auth-service.service";

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-listchinhsach',
  templateUrl: './listchinhsach.component.html',
  styleUrls: ['./listchinhsach.component.css']
})
export class ListchinhsachComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  policys: Array<Policy> = [];
  user = new User();

  constructor(
    private policyService: PolicyService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  getAllPolicy(){
    this.policyService.getAll().subscribe(data =>{
      this.policys = data.listPolicy;
      this.dtTrigger.next();
      console.log(this.policys);
    });
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
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllPolicy();
  }

}
