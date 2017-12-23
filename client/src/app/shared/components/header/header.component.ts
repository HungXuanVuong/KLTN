import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../service/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user = true;
  users;
  role = '';

  constructor(

    private authService : AuthServiceService,
    private router : Router
  ) { }

  onLogoutClick(){
    this.authService.logout();
    //this.flashMessagesService.show('Ban da logout', {cssClass: 'alert-info'});
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.users = profile.user;
        console.log(this.users);
        this.role = profile.user.role;
       //  console.log(profile.user.role);
      }else{
        return;
      }
    });
  }

}
