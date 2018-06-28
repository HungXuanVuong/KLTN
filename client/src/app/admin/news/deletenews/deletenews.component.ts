import { NewsService } from './../../../service/news.service';
import { Router, ActivatedRoute } from '@angular/router';
import { News } from './../../../models/news';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-deletenews',
  templateUrl: './deletenews.component.html',
  styleUrls: ['./deletenews.component.css'],
  animations: [routerTransition()]
})
export class DeletenewsComponent implements OnInit {


  message;
  messageClass;
  processing = false;

  news;
  foundNews = false;
  currentUrl;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteNews(){
    this.processing = true;
    this.newsService.deleteNews(this.currentUrl.id).subscribe(data =>{
      // check yeu cau xoa
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['admin/listnews']);
        }, 1000);
      }
    });
  }

  redirect(){
    this.router.navigate(['admin/listnews']);
  }

  editStatusNews() {
    let news = {
      _id: this.currentUrl.id
    }
    this.newsService.editStatusNews(news).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['admin/listnews']);
        }, 1000);
      }
    });
  }


  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else{
        this.news = {
          title: data.news.title,
          urlHinh: data.news.urlHinh
        }
        this.foundNews = true;
      }
    });
  }

}
