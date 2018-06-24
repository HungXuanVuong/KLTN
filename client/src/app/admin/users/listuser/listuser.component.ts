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

  message;
  messageClass;
  processing = false;

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

  lockUser(id){
    let userLock = {
      _id: id,
      status: 'lock'
    };
    this.userService.lockUser(userLock).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }

  unLockUser(id){
    let userLock = {
      _id: id,
      status: 'unlock'
    };
    this.userService.unLockUser(userLock).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }

  ngOnInit() {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
    };

    this.getAllUser();
  }

}
