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
  // chart

  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Thống kê ứng viên';

  hoso = 10;
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
        // console.log(data);
        // this.policyId = data.news.newsPolicy;
        // console.log(data.news.newsPolicy);
        this.policyService.getSingle(data.news.newsPolicy).subscribe(policy => {
          if (!policy.success) {
            this.processing = false;
          } else {
            this.policy = policy.policy;
            //console.log(this.policy);
          }
        });
        this.foundNews = true;
      }
    });
  }


  updatePointFileUser(idUser) {
    console.log(idUser);
    console.log(this.policy);
    this.authService.findUserById(idUser).subscribe(user =>{
       this.point = user.user;
      console.log(this.point);
      this.point.point += this.policy.pointInterview;
      this.authService.editPointUser(this.point).subscribe(user =>{
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
    // console.log(this.policy);
    this.authService.findUserById(idUser).subscribe(user =>{
       this.point = user.user;
      this.point.point += this.policy.pointSign;
      this.point.uvNumber +=1;
      this.authService.editPointSignUser(this.point).subscribe(user =>{
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
    if(status == 'Phỏng vấn'){
      this.newscandidate.point += this.policy.pointInterview;
      console.log(this.newscandidate.point);
    }
    if(status == 'Hợp đồng'){
      this.newscandidate.point += this.policy.pointSign;
      console.log(this.newscandidate.point);
    }

    console.log(this.newscandidate);
    // this.newscandidate.point = 
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
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.getSingleNews(this.currentUrl.id);
    this.getListCandidateByNewsId(this.currentUrl.id);
    this.getListUserByNewsId(this.currentUrl.id);
    
    this.data = {
      labels: ['Hồ sơ', 'Phỏng vấn', 'Hợp đồng'],
      datasets: [
          {
              label: 'Ứng viên',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: [40, 23, 16]
          },
          {
              label: 'Ứng tuyển',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: [31, 23, 18]
          }
      ]
  }

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
          "value": "13",
        },

      ]
    }

  }

}
