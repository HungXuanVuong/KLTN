import { FileUploader } from 'ng2-file-upload';
import { News } from './../../../models/news';
import { User } from './../../../models/user';
import { AuthServiceService } from './../../../service/auth-service.service';
import { NewsService } from './../../../service/news.service';
import { PolicyService } from './../../../service/policy.service';
import { Policy } from './../../../models/policy';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import {Popup} from 'ng2-opd-popup';
declare var jQuery:any;

@Component({
  selector: 'app-formnews',
  templateUrl: './formnews.component.html',
  styleUrls: ['./formnews.component.css']
})
export class FormnewsComponent implements OnInit {

  ckeditorContent;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 7, day: 1 } };

  myForm: FormGroup;
  message;
  messageClass;
  processing = false;

  policyList: Array<Policy> = [];
  policy = new Policy();

  newsPolicy = '';
  selectedPolicy: Object = {};

  expDate : any;
  saved = true;

  user = new User();
  userId = '';
  pointUv = 0;

  public uploaderNews: FileUploader = new FileUploader({ url: 'http://localhost:3000/news/upimgnews' });


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private policyService: PolicyService,
    private newService: NewsService,
    private authService: AuthServiceService

  ) {
    this.createForm();
    
  }
  
  pointRefer(){
    this.policyService.getSingle(this.newsPolicy).subscribe(data =>{
    this.pointUv =  data.policy.pointFile + data.policy.pointInterview + data.policy.pointSign;
    console.log(data.policy.pointFile + data.policy.pointInterview + data.policy.pointSign);
    });
  }
  selectPolicyHandle(event: any){
    this.newsPolicy = event.target.value;
    this.pointRefer();
    
  }
  onDateChanged(event: IMyDateModel) {
    this.expDate = event.jsdate;
    console.log(this.expDate);
   // console.log(this.nhanvienDate);
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
        Validators.maxLength(15)
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
  
  clearAllFields() {
    this.enableForm();
    this.ckeditorContent = "";
    this.myForm.reset();
  }

  redirectListNews(){
    this.router.navigate(['/admin/listnews']);
  }
  getAllPolicy(){
    this.policyService.getAll().subscribe(data =>{
      this.policyList = data.listPolicy;
      console.log(this.policyList);
    });
  }
  disableForm() {
    this.myForm.controls['title'].disable();
    this.myForm.controls['place'].disable();
    this.myForm.controls['salary'].disable();
    this.myForm.controls['position'].disable();
    this.myForm.controls['numberOf'].disable();
    this.myForm.controls['myDate'].disable();
    this.myForm.controls['policy'].disable();
    this.myForm.controls['status'].disable();
  }

  enableForm() {
    this.myForm.controls['title'].enable();
    this.myForm.controls['place'].enable();
    this.myForm.controls['salary'].enable();
    this.myForm.controls['position'].enable();
    this.myForm.controls['numberOf'].enable();
    this.myForm.controls['myDate'].enable();
    this.myForm.controls['policy'].enable();
    this.myForm.controls['status'].enable();
  }

  addNews(){

    this.pointRefer();
    console.log(this.pointUv);
    this.processing = true;
    this.disableForm();
    const news ={
      urlHinh: this.uploaderNews.queue[0].file.name,
      title: this.myForm.get('title').value,
      place: this.myForm.get('place').value,
      salary: this.myForm.get('salary').value,
      position: this.myForm.get('position').value,
      numberOf: this.myForm.get('numberOf').value,
      exp_date: this.expDate,
      newsPolicy: this.newsPolicy,
      employee: this.userId,
      point_uv: this.pointUv,
      content: this.ckeditorContent
    }
    console.log(news);
    this.newService.addNews(news).subscribe(data =>{
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.uploaderNews.queue[0].upload();
         this.saved = false;
        this.messageClass = "alert alert-success";
        this.message = data.message;
        
        // setTimeout(() =>{
        //   this.router.navigate(['/admin/listnews']);
        // }, 2000);
      }
    });
  }

  ngOnInit() {
    this.getAllPolicy();
    this.authService.getProfile().subscribe(profile => {
      if(profile){
        this.user = profile.user;
        this.userId = profile.user._id;
      }else{
        return;
      }
    });
  }

  // onChange() {
  //   console.log('Change');
  //   console.log(this.ckeditorContent);
  // }
}
