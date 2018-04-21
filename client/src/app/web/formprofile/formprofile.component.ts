import { User } from '../../models/user';

import { NewsService } from '../../service/news.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { News } from '../../models/news';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formprofile',
  templateUrl: './formprofile.component.html',
  styleUrls: ['./formprofile.component.css']
})
export class FormprofileComponent implements OnInit {

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
  
  sex: string = 'Nam';
  selectSexHandle(event: any) {
    this.sex = event.target.value;
    console.log(this.sex);
  }
  selectedSex: Object = {};

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.user = data.user;
        this.loading = false;
      }

    });

    // this.currentUrl = this.activatedRoute.snapshot.params;
    // this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
    //   if (!data.success) {
    //     this.messageClass = 'alert alert-danger'; // Set bootstrap error class
    //     this.message = data.message; // Set error message
    //   } else {
    //     this.news = data.news; // Save blog object for use in HTMLxx
    //     this.loading = false; // Allow loading of blog form
    //   }
    // });
  }

}
