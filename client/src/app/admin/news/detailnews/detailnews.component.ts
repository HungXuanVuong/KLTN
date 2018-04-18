import { NewsuserService } from '../../../service/newsuser.service';
import { News_User } from '../../../models/news_user';
import { NewscandidateService } from '../../../service/newscandidate.service';
import { News_Candidate } from '../../../models/news_candidate';
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


  news_candidte : Array<News_Candidate> = [];
  news_user: Array<News_User> = [];

  newsuser = new News_User();
  newscandidate = new News_Candidate();

  user = new User();
// chart

id = 'chart1';
width = 600;
height = 400;
type = 'column2d';
dataFormat = 'json';
dataSource;
title = 'Thống kê ứng viên';

hoso = 10;



  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private newscandidteService: NewscandidateService,
    private newUserService: NewsuserService
  ) { }

  getSingleNews(id){
    this.newsService.getSingleNews(id).subscribe(data =>{
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


  testClick(id){
    console.log(id);
  }

  updateStatusNewsUser(id, status){
    this.newsuser._id = id;
    this.newsuser.status = status;
    this.newUserService.editStatusNewsUser(this.newsuser).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message;
        this.processing = false; 
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        this.ngOnInit();
      }
    });
  }

  updateStatusNewsCandidate(id, status){
    this.newscandidate._id = id;
    this.newscandidate.status = status;
    this.newscandidteService.editStatusNewsCandidate(this.newscandidate).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message;
        this.processing = false; 
      } else {
        this.messageClass = 'alert alert-success'; 
        this.message = data.message; 
        this.ngOnInit();
      }
    });
  }

  getListCandidateByNewsId(id){
    this.newscandidteService.getCandidteByNewsId(id).subscribe(data =>{
        this.news_candidte = data.candidates;
    });
  }

  getListUserByNewsId(id){
    this.newUserService.getUserByNewsId(id).subscribe(data =>{
      this.news_user = data.users;
      console.log(this.news_user);
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.getSingleNews(this.currentUrl.id);
    this.getListCandidateByNewsId(this.currentUrl.id);
    this.getListUserByNewsId(this.currentUrl.id);
    
    this.dataSource = {
      "chart": {
          "caption": "Thống kê ứng viên của tin tuyển dụng",
          // "subCaption": "Top 5 stores in last month by revenue",
          // "numberprefix": "Người",
          "theme": "fint"
      },
      "data": [
          {
              "label": "Hồ sơ",
              "value": 32
          },
          {
              "label": "Phỏng vấn",
              "value": "23"
          },
          {
              "label": "Hợp đồng",
              "value": "13"
          },
      ]
  }
    
  }

}
