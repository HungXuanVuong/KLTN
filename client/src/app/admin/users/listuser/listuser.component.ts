import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user";
import { AuthServiceService } from "../../../service/auth-service.service";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  users : Array<User> = [];
  constructor(
    private userService: AuthServiceService
  ) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data =>{
      this.users = data.listUsers;
    });
  }

}
