import { Router } from '@angular/router';
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
    private authService: AuthServiceService,
    private router: Router
  ) { }

  RedirectUnregister() {
    this.router.navigate(['/redirectpage'],
      { queryParams: { mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger" } });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
      if(!data.success){
        this.RedirectUnregister();
      }
      this.urlHinh = data.user.urlHinh;
      this.username = data.user.username;
      this.point = data.user.point;
      this.uvNumber = data.user.uvNumber;
    });
  }

}
