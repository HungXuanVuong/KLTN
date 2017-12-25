import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';



@Component({
  selector: 'app-jobdashboad',
  templateUrl: './jobdashboad.component.html',
  styleUrls: ['./jobdashboad.component.css']
})
export class JobdashboadComponent implements OnInit {

  user;
  urlHinh;
  username;
  point;
  uvNumber;

  constructor(
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
      this.urlHinh = data.user.urlHinh;
      this.username = data.user.username;
      this.point = data.user.point;
      this.uvNumber = data.user.uvNumber;
    });
  }

}
