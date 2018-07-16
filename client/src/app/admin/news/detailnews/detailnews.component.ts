import { Policy } from '../../../models/policy';
import { PolicyService } from '../../../service/policy.service';
import { NewsuserService } from '../../../service/newsuser.service';
import { News_User } from '../../../models/news_user';
import { NewscandidateService } from '../../../service/newscandidate.service';
import { News_Candidate } from '../../../models/news_candidate';
import { User } from './../../../models/user';
import { News } from './../../../models/news';
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

  news = new News();

  policyId = "";
  policy = new Policy();
  foundNews = false;
  currentUrl;

  point;

  news_candidte: Array<News_Candidate> = [];
  news_user: Array<News_User> = [];

  newsuser = new News_User();
  newscandidate = new News_Candidate();

  user = new User();

  userFile = 0;
  userInterView = 0;
  UserSign = 0;

  candidateFile = 0;
  candidateInterView = 0;
  candidateSign = 0;

  file;

  // chart

  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Thống kê ứng viên';

  data: any;


  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private newscandidteService: NewscandidateService,
    private newUserService: NewsuserService,
    private policyService: PolicyService,
  ) { }

  getSingleNews(id) {
    this.newsService.getSingleNews(id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.news = data.news;
        this.policyService.getSingle(data.news.newsPolicy).subscribe(policy => {
          if (!policy.success) {
            this.processing = false;
          } else {
            this.policy = policy.policy;
          }
        });
        this.foundNews = true;
      }
    });
  }

  updatePointFileUser(idUser) {
    console.log(idUser);
    console.log(this.policy);
    this.authService.findUserById(idUser).subscribe(user => {
      this.point = user.user;
      console.log(this.point);
      this.point.point += this.policy.pointInterview;
      this.authService.editPointUser(this.point).subscribe(user => {
        if (!user.success) {
          this.messageClass = 'alert alert-danger';
          this.message = user.message;
          this.processing = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = user.message;
        }
      });
    });
  }

  updatePointSignUser(idUser) {
    console.log(idUser);
    this.authService.findUserById(idUser).subscribe(user => {
      this.point = user.user;
      this.point.point += this.policy.pointSign;
      this.point.uvNumber += 1;
      this.authService.editPointSignUser(this.point).subscribe(user => {
        if (!user.success) {
          this.messageClass = 'alert alert-danger';
          this.message = user.message;
          this.processing = false;
        } else {
          this.messageClass = 'alert alert-success';
          this.message = user.message;
        }
      });
    });
  }

  updateStatusNewsUser(id, status) {
    this.newsuser._id = id;
    this.newsuser.status = status;
    this.newUserService.editStatusNewsUser(this.newsuser).subscribe(data => {
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

  updateStatusNewsCandidate(id, status) {
    this.newscandidate._id = id;
    this.newscandidate.status = status;
    if (status == 'Phỏng vấn') {
      this.newscandidate.point = this.newscandidate.point + this.policy.pointInterview + this.policy.pointFile;
      console.log(this.newscandidate.point);
    }
    if (status == 'Hợp đồng') {
      console.log(this.newscandidate.point);
      this.newscandidate.point = this.newscandidate.point + this.policy.pointSign;
      console.log(this.newscandidate.point);
    }
    console.log(this.newscandidate);
    this.newscandidteService.editStatusNewsCandidate(this.newscandidate).subscribe(data => {
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

  getListCandidateByNewsId(id) {
    this.newscandidteService.getCandidteByNewsId(id).subscribe(data => {
      this.news_candidte = data.candidates;
      console.log(this.news_candidte);
    });
  }

  getListUserByNewsId(id) {
    this.newUserService.getUserByNewsId(id).subscribe(data => {
      this.news_user = data.users;

    });
  }

  getPolicyForNews(id) {
    this.policyService.getSingle(id).subscribe(policy => {
      if (!policy.success) {
        this.processing = false;
      } else {

        this.policy = policy;
        console.log(this.policy);
      }
    });
  }

  listtest;
  countUserInNewsByFile(id) {
    let user = {
      status: 'Hồ sơ'
    };
    this.newUserService.getUserInNewsByStatus(id, user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.userFile = data.counterUser;
      }
    });
  }

  countUserInNewsByInterview(id) {
    let user = {
      status: 'Phỏng vấn'
    };
    this.newUserService.getUserInNewsByStatus(id, user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.userInterView = data.counterUser;
      }
    });
  }

  countUserInNewsBySign(id) {
    let user = {
      status: 'Hợp đồng'
    };
    this.newUserService.getUserInNewsByStatus(id, user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.UserSign = data.counterUser;
        console.log(this.userFile + '/' + this.userInterView + '/' + this.UserSign);
        console.log(this.candidateFile + '/' + this.candidateInterView + '/' + this.candidateSign);

      }
    });
  }

  countCandidateInNewsByFile(id) {
    let user = {
      status: 'Hồ sơ'
    };
    this.newscandidteService.getCandidateInNewsByStatus(id, user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.candidateFile = data.counterCandidate;
      }
    });
  }

  countCandidateInNewsByInterview(id) {
    let user = {
      status: 'Phỏng vấn'
    };
    this.newscandidteService.getCandidateInNewsByStatus(id, user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.candidateInterView = data.counterCandidate;
      }
    });
  }

  countCandidateInNewsBySign(id) {
    let user = {
      status: 'Hợp đồng'
    };
    this.newscandidteService.getCandidateInNewsByStatus(id, user).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.candidateSign = data.counterCandidate;
        console.log(this.userFile + '/' + this.userInterView + '/' + this.UserSign);
        console.log(this.candidateFile + '/' + this.candidateInterView + '/' + this.candidateSign);
        this.data = {
          labels: ['Hồ sơ', 'Phỏng vấn', 'Hợp đồng'],
          datasets: [
            {
              label: 'Ứng viên',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [this.candidateFile, this.candidateInterView, this.candidateSign]
            },
            {
              label: 'Ứng tuyển',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [this.userFile, this.userInterView, this.UserSign]
            }
          ]
        }
        this.dataSource = {
          "chart": {
            "caption": "Thống kê của tin tuyển dụng",
            "theme": "fint"
          },
          "data": [
            {
              "label": "Hồ sơ",
              "value": this.userFile+this.candidateFile
            },
            {
              "label": "Phỏng vấn",
              "value": this.userInterView+this.candidateInterView
            },
            {
              "label": "Hợp đồng",
              "value": this.UserSign+this.candidateSign
            },
  
          ]
        }
      }
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.getSingleNews(this.currentUrl.id);
    this.getListCandidateByNewsId(this.currentUrl.id);
    this.getListUserByNewsId(this.currentUrl.id);

    this.countUserInNewsByFile(this.currentUrl.id);
    this.countUserInNewsByInterview(this.currentUrl.id);
    setTimeout(() => this.countUserInNewsBySign(this.currentUrl.id), 1000);

    this.countCandidateInNewsByFile(this.currentUrl.id);
    this.countCandidateInNewsByInterview(this.currentUrl.id);
    setTimeout(() => this.countCandidateInNewsBySign(this.currentUrl.id), 2000);
  }
}
