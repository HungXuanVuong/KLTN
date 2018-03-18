import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  urlHinh;
  username;
  register_date;
  dateOfBirth;
  sex;
  address;
  email;
  phone;
  constructor(
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
      this.user = data.user;
      console.log(this.user);
      this.urlHinh = data.user.urlHinh;
      this.username = data.user.username;
      this.register_date = data.user.register_date;
      this.dateOfBirth = data.user.dateOfBirth;
      this.sex = data.user.sex;
      this.address = data.user.address;
      this.email = data.user.email;
      this.phone = data.user.phone;
    });
  }

}
