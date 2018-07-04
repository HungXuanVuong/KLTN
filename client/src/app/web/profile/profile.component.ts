import { FormControl } from '@angular/forms';
import { NewsuserService } from '../../service/newsuser.service';
import { User } from '../../models/user';

import { NewsService } from '../../service/news.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { News } from '../../models/news';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message;
  messageClass;

  processing = false;
  currentUrl;
  loading = true;

  news = new News();

  user = new User();

  constructor(
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private newsuserService: NewsuserService,
    private router: Router,
    private newsuserSevice: NewsuserService
  ) { 
    setTimeout(() => {
      this.checkUserHaveApply();
    }, 40);
  }

  addNewsUser() {
    console.log('add news user');
    var idNews = this.currentUrl = this.activatedRoute.snapshot.params;
    var idUser = this.user._id;
    const newsUser = {
      news: idNews.id,
      user: idUser
    }
    this.newsuserService.addNewsUser(newsUser).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
      }
    });
  }

  RedirectUnregister() {
    this.router.navigate(['/redirectpage'],
      { queryParams: { mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger" } });
  }
  checkAuth() {
    this.authService.getProfile().subscribe(data => {
      if (!data.success) {

        this.RedirectUnregister();
      } else {
        this.user = data.user;
      }
      this.loading = false;
    });
  }
  isTrue;
  checkUserHaveApply() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    let newsuser = {
      news: this.currentUrl.id,
      user: this.user._id
    };
    this.newsuserSevice.checkUserHaveApplyIntoNews(newsuser).subscribe(data => {
      console.log(data);
      this.isTrue = data.success;
      if (!data.sucess) {

        return data.success;
      } else {
        return data.success;
      }
    });
  }
  ngOnInit() {

    this.checkAuth();

    this.currentUrl = this.activatedRoute.snapshot.params;

    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.news = data.news; // Save blog object for use in HTMLxx
        this.loading = false; // Allow loading of blog form
      }
    });

  }
}
