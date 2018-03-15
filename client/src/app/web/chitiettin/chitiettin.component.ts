import { AuthServiceService } from '../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';


import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../service/news.service';
import {News} from '../../models/news';

import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chitiettin',
  templateUrl: './chitiettin.component.html',
  styleUrls: ['./chitiettin.component.css']
})
export class ChitiettinComponent implements OnInit {

  message;
  messageClass;
  
  processing = false;
  currentUrl;
  loading = true;

  news = new News();

  user;

  // urlHinh;
  // title;
  // address;
  // salary;
  // position;
  // create_date;
  // exp_date;

  netImage:any = '../../../assets/web/img/imgtin/';
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private authService: AuthServiceService
  ) { }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
}

  ngOnInit() {

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
        this.netImage += this.news.urlHinh;
        console.log(this.news);
        this.loading = false; // Allow loading of blog form
      }
    });

    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
        console.log(this.user);
      }else{
        return;
      }
    });
  }

}
