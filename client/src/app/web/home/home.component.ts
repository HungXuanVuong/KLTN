import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { NewsService } from '../../service/news.service';
import { User } from "../../models/user";
import { News } from "../../models/news";

// import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  month = 0;
  news: Array<News> = [];
  users: Array<User> = [];
  user: User;

  searchKey = "";
  searchName = "";


  constructor(
    private authService: AuthServiceService,
    private newsService: NewsService,
    private router: Router
  ) {

   }

  OnclickSearch(){
    this.searchKey = this.searchName;
  }

  RedirectUnregister(){
    this.router.navigate(['/login'],
    {queryParams: {mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger"}});
  }

  ngOnInit() {
    this.newsService.getTop6News().subscribe(data =>{
      this.news = data.listNews;
      console.log(this.news);
    });
    this.authService.getTop4User().subscribe(data =>{
      //this.users = data.listUsers;
      this.users = data.listUsers;
      console.log(this.users);
      var d = new Date();
      this.month = d.getMonth();
      if(this.month == 0){
        this.month = 12;
      }
    });

    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
      }else{
        return;
      }
    });

  }

}
