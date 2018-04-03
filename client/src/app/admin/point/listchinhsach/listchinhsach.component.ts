import { PolicyService } from './../../../service/policy.service';
import { Policy } from './../../../models/policy';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private policyService: PolicyService
  ) { }

  getAllPolicy(){
    this.policyService.getAll().subscribe(data =>{
      this.policys = data.listPolicy;
      this.dtTrigger.next();
      console.log(this.policys);
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllPolicy();
  }

}
