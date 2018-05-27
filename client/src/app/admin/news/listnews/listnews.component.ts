import { User } from '../../../models/user';
import { PolicyService } from './../../../service/policy.service';
import { Component, OnInit } from '@angular/core';
import { News } from "../../../models/news";
import { NewsService } from "../../../service/news.service";
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { AuthServiceService } from './../../../service/auth-service.service';

// import {News} from ''
@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})
export class ListnewsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  news : Array<News> = [];

  user = new User();
  message;
  messageClass;
  processing = false;

  constructor(
    private newsService : NewsService,
    private authService: AuthServiceService,
    private router: Router
  ) { }

  newsId = '';
  userId = 0;

  deleteNews(id){
    this.newsService.deleteNews(id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.getAllNews();
      }
    });
  }

  getAllNews(){
    this.newsService.getTop6News().subscribe(data => {
      this.news = data.listNews;
      this.dtTrigger.next();
      console.log(data.listNews);
    });
  }

  RedirectUnregister(){
    this.router.navigate(['/redirectpage'],
    {queryParams: {mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger"}});
  }
  checkRole(){
    this.authService.getProfile().subscribe(profile => {
      if(!profile.user){
        this.RedirectUnregister();
      }else{
        this.user = profile.user;
        this.userId = profile.user._id;
      }
    });
  }
  ngOnInit() {
   
    this.checkRole();
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllNews();
    

    // this.policyService.getAll().subscribe(data =>{
    //   console.log(data);
    // });

    
  }

}
