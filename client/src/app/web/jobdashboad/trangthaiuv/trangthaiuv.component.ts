import { News_Candidate } from './../../../models/news_candidate';
import { NewscandidateService } from '../../../service/newscandidate.service';
import { NewsService } from './../../../service/news.service';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trangthaiuv',
  templateUrl: './trangthaiuv.component.html',
  styleUrls: ['./trangthaiuv.component.css']
})
export class TrangthaiuvComponent implements OnInit {


  message;
  messageClass;
  
  processing = false;
  currentUrl;
  loading = true;

  newsCandidate = new News_Candidate();

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private newsCandidateService: NewscandidateService
  ) {
    
   }

  //complete = '.shop-tracking-status .order-status-timeline .order-status-timeline-completion.c3{width:70%}';

  width = 0;
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsCandidateService.getNewsCandidateById(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.newsCandidate = data.newscandidate; 
        console.log(this.newsCandidate);
        if(this.newsCandidate.status ==='Phỏng vấn'){
          this.width = 50;
        }else if(this.newsCandidate.status ==='Hợp đồng'){
          this.width = 100;
        }
        this.loading = false;
      }
    });
    
  }

}
