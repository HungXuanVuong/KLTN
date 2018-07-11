import { NewscandidateService } from './../../../service/newscandidate.service';
import { User } from "../../../models/user";
import { Router } from '@angular/router';
import { AuthServiceService } from "../../../service/auth-service.service";
import { Component, OnInit } from '@angular/core';
import { News_Candidate } from '../../../models/news_candidate';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-listshared',
  templateUrl: './listshared.component.html',
  styleUrls: ['./listshared.component.css']
})
export class ListsharedComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  message;
  messageClass;
  processing = false;
  listNewsCandidate: Array<News_Candidate> = [];
  user = new User();
  
  constructor(
    private router: Router,
    private newsCandidateService: NewscandidateService,
    private authService: AuthServiceService
  ) { }

  getAllNewsCandidate(){
    this.newsCandidateService.getAllNewsCandidate().subscribe(data =>{
        this.listNewsCandidate = data.listnewsCandidate;
        this.dtTrigger.next();
        console.log(this.listNewsCandidate);
    });
  }

  RedirectUnregister() {
    this.router.navigate(['/redirectpage'],
      { queryParams: { mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger" } });
  }
  checkRole() {
    this.authService.getProfile().subscribe(profile => {
      if (!profile.user) {
        this.RedirectUnregister();
      } else {
        this.user = profile.user;
      }
    });
  }

  ngOnInit() {
    this.checkRole();
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllNewsCandidate();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
