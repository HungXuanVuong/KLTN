import { NewscandidateService } from './../../../service/newscandidate.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { News_Candidate } from '../../../models/news_candidate';
import { Subject } from 'rxjs/Subject';

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
  
  constructor(
    private router: Router,
    private newsCandidateService: NewscandidateService
  ) { }

  getAllNewsCandidate(){
    this.newsCandidateService.getAllNewsCandidate().subscribe(data =>{
        this.listNewsCandidate = data.listnewsCandidate;
        this.dtTrigger.next();
        console.log(this.listNewsCandidate);
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.getAllNewsCandidate();
  }

}
