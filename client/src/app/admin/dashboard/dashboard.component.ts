import { GiftService } from './../../service/gift.service';
import { AuthServiceService } from './../../service/auth-service.service';
import { CandidateService } from './../../service/candidate.service';
import { User } from './../../models/user';
import { Candidate } from './../../models/candidate';
import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  candidates: Array<Candidate> = [];
  users: Array<User> = [];

  numberOfNews = 0;
  numberOfCandidate = 0;
  numberOfUser = 0;
  numberOfGift = 0;

  constructor(
    private newsService: NewsService,
    private candidateService: CandidateService,
    private userService: AuthServiceService,
    private giftService: GiftService
  ) { }

  getAllCandidate() {
    this.candidateService.getAllCandidate().subscribe(data => {
      if (!data.success) {
        return;
      }
      this.numberOfCandidate = data.countusers;
    });
  }

  getAllUser() {
    this.userService.getAllUser().subscribe(data => {
      if (!data.success) {
        return;
      }
      this.numberOfUser = data.countusers;
    });
  }

  getAllGift() {
    this.giftService.getAllGift().subscribe(data => {
      if (!data.success) {
        return;
      }
      this.numberOfGift = data.countgift;
    });
  }

  getAllNews() {
    this.newsService.getTop6News().subscribe(data => {
      if (!data.success) {
        return;
      }
      this.numberOfNews = data.countnews;
    });
  }

  getTop5User() {
    this.candidateService.getTop5Candidate().subscribe(data =>{
      if(!data.success){
        return;
      }
      this.candidates = data.listCandidate;
    });
  }

  getTop5Candidate() {
    this.userService.getTop5User().subscribe(data =>{
      if(!data.success){
        return;
      }
      this.users = data.listUsers;
    });
  }


  ngOnInit() {
    this.getAllNews();
    this.getAllCandidate();
    this.getAllGift();
    this.getAllUser();

    this.getTop5Candidate();
    this.getTop5User();

  }

}
