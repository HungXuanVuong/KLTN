import { User } from '../../models/user';

import { NewsService } from '../../service/news.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import {News} from '../../models/news';

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
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(data =>{
      this.user = data.user;
      console.log(this.user);

    });

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
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
