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
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
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

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.news = data.news; // Save blog object for use in HTMLxx
        // this.urlHinh;
        // this.title;
        //   //this.xsalary;
        // this.news.urlHinh = 'hometd3';
        // this.netImage += this.news.urlHinh;
        console.log(this.news);
        this.loading = false; // Allow loading of blog form
      }
    });

  }

}
