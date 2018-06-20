import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user";
import { AuthServiceService } from "../../../service/auth-service.service";

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users : Array<User> = [];
  constructor(
    private userService: AuthServiceService
  ) { }

  getAllUser(){
    this.userService.getAllUser().subscribe(data =>{
      this.users = data.listUsers;
      this.dtTrigger.next();
    });
  }

  ngOnInit() {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.getAllUser();
  }

}
