import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { NewsService } from '../../service/news.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users;
  news;

  constructor(
    private authService: AuthServiceService,
    private newsService: NewsService

  ) { }

  ngOnInit() {

    this.newsService.getAllNews().subscribe(data =>{
      this.news = data.listNews;
      console.log(this.news);
    });
    this.authService.getTop4User().subscribe(data =>{
      this.users = data.listUsers;
      console.log(this.users);
    });

  }

}
