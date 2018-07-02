import { NewsuserService } from './../../../service/newsuser.service';
import { Router } from '@angular/router';
import { AuthServiceService } from './../../../service/auth-service.service';
import { News_User } from './../../../models/news_user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uvdagt',
  templateUrl: './uvdagt.component.html',
  styleUrls: ['./uvdagt.component.css']
})
export class UvdagtComponent implements OnInit {

  message;
  messageClass;
  processing = false;

  news;
  foundNews = false;
  currentUrl;

  newsUsers: Array<News_User> = [];
  userId = 0;

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private newsUserService: NewsuserService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.user._id;
      let user = {
        id: this.userId
      };
      this.newsUserService.getAllNewsUserByIdUser(user).subscribe(data => {
        this.newsUsers = data.newsUsers;
        console.log(this.newsUsers);
      });
    });
  }

}
