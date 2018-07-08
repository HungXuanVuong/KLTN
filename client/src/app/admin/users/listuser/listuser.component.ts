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
  user = new User();

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

  updateRoleUser(id, role){
    let userRole = {
      _id: id,
      role: role
    }
    this.userService.editRoleUser(userRole).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.ngOnInit();
      }
    });
  }

  showWork(){
    console.log(this.user);
    this.updateRoleUser(this.user._id, 'user');
    this.ngOnInit();
  }

  getUserInfo(id){
    this.userService.findUserById(id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.user = data.user;
      }
    });
  }
  ngOnInit() {
    this.userService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
      }else{
        return;
      }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllUser();
  }

}
