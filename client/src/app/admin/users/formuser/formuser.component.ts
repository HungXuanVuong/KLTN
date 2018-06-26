import { AuthServiceService } from './../../../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formuser',
  templateUrl: './formuser.component.html',
  styleUrls: ['./formuser.component.css']
})
export class FormuserComponent implements OnInit {

  
  message;
  messageClass;
  user = new User();
  processing = false;
  currentUrl;
  loading = true;
  // role = 'user';
  role = '';
  selectedRole: Object = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: AuthServiceService
  ) { }

  selectRoleHandle(event: any) {
    this.role = event.target.value;
  }

  updateRoleUser(){
    let userRole ={
      _id: this.user._id,
      role: this.role
    }
    this.userService.editRoleUser(userRole).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/admin/listuser']); // Navigate back to route page
        }, 1000);
      }
    });
  }
  show(){
    console.log('clicked!');
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.userService.findUserById(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.user = data.user;
        this.selectedRole = data.user.role;
        this.role = data.user.role;
      }
    });
  }

}
