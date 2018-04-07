import { User } from './../../../models/user';
import { AuthServiceService } from './../../../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from './../../../service/news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailnews',
  templateUrl: './detailnews.component.html',
  styleUrls: ['./detailnews.component.css']
})
export class DetailnewsComponent implements OnInit {
  message;
  messageClass;
  processing = false;

  news;
  foundNews = false;
  currentUrl;

  user = new User();

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        console.log(data);
        this.news = {
          title: data.news.title,
          employee: data.news.employee,
          content: data.news.content
        }
        this.authService.findUserById(this.news.employee).subscribe(userData =>{
          this.user = userData.user;
        });
        this.foundNews = true;
      }
    });

    
    
  }

}
