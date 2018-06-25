import { JobdashboadComponent } from './../../../web/jobdashboad/jobdashboad.component';
import { Policy } from './../../../models/policy';
import { PolicyService } from './../../../service/policy.service';
import { NewsService } from './../../../service/news.service';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { News } from '../../../models/news';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.css']
})
export class EditnewsComponent implements OnInit {


  message;
  messageClass;
  news = new News();
  processing = false;
  currentUrl;
  loading = true;

  policy = '5abdab207afe4d222025631e';
  model: any;
  selectedPolicy: Object = {};

  listPolicy: Array<Policy> = [];
  ckeditorContent;

  myForm: FormGroup;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private newService: NewsService,
    private policyService: PolicyService,
    private formBuilder: FormBuilder,

  ) {
    this.createForm();
   }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };

  onDateChanged(event: IMyDateModel) {
    this.model = event.jsdate;
    console.log(this.model);
  }
  selectPolicyHandle(event: any) {
    this.policy = event.target.value;
  }

  validateNumberOf(controls) {
    const regExp = new RegExp(/[0-9]/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateNumberOf': true }
    }
  }
  createForm() {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40)
      ])],
      place: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])],
      salary: ['', Validators.compose([
        Validators.required
      ])],
      position: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(8)
      ])],
      numberOf: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        this.validateNumberOf
      ])],
      myDate: [this.model, Validators.required],
      policy: ['', Validators.compose([
        Validators.required
      ])],
      status: ['', Validators.compose([
        Validators.required
      ])],
      newsPolicy: ['', Validators.compose([
        Validators.required
      ])]

    });
  }

  getAllPolicy() {
    this.policyService.getAll().subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.listPolicy = data.listPolicy;
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/listnews']);
  }

  updateNews() {
    this.processing = true;
    this.news.exp_date = this.model.jsdate;
    this.news.newsPolicy = this.policy;
    this.news.content = this.ckeditorContent;
    console.log(this.news.content);
    this.newService.editNews(this.news).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
      }
    });
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newService.getSingleNews(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.news = data.news;
        this.ckeditorContent = data.news.content;
        console.log(data);
        this.loading = false;
        var d = new Date(data.news.exp_date);
        this.model = {
          date: {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          }
        }
        this.selectedPolicy = data.news.newsPolicy;
      }
    });
    this.getAllPolicy();
  }

}
