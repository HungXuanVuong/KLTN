import { NewscandidateService } from '../../../service/newscandidate.service';
import { News_Candidate } from '../../../models/news_candidate';
import { User } from './../../../models/user';
import { AuthServiceService } from './../../../service/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uvdanggt',
  templateUrl: './uvdanggt.component.html',
  styleUrls: ['./uvdanggt.component.css']
})
export class UvdanggtComponent implements OnInit {

  message;
  messageClass;
  processing = false;

  news;
  foundNews = false;
  currentUrl;

  news_candidte: Array<News_Candidate> = [];

  user = new User();

  userId = 0;
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private newscandidteService: NewscandidateService
  ) { }

  getListCandidateByUserId(id) {
    console.log(id);

  }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.userId = profile.user._id;
      this.newscandidteService.getCandidateByUserId(this.userId).subscribe(data => {
        this.news_candidte = data.candidates;
      });
    });




  }

}
