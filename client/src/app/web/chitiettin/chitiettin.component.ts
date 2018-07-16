import { User } from './../../models/user';
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

  user = new User();

  netImage:any = '/images/imgtin/';
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

RedirectUnregister(){
  this.router.navigate(['/login'],
  {queryParams: {mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger"}});
}
  ngOnInit() {

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
      } else {
        this.news = data.news; 
        this.netImage += this.news.urlHinh;
        console.log(this.news);
        this.loading = false;
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
