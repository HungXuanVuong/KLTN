import { Component, OnInit } from '@angular/core';
import { News } from "../../../models/news";
import { NewsService } from "../../../service/news.service";


// import {News} from ''
@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})
export class ListnewsComponent implements OnInit {

  news : Array<News> = [];
  constructor(
    private newsService : NewsService
  ) { }

  ngOnInit() {
    this.newsService.getAllNews().subscribe(data => {
      this.news = data.listNews;
      console.log(this.news);
    });
  }

}
