
import { NewsService } from '../../service/news.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import {News} from '../../models/news';

import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formgioithieu',
  templateUrl: './formgioithieu.component.html',
  styleUrls: ['./formgioithieu.component.css']
})
export class FormgioithieuComponent implements OnInit {

  message;
  messageClass;
  
  processing = false;
  currentUrl;
  loading = true;

  myForm: FormGroup;

  news = new News();

  constructor(
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { 
    this.createForm();

  }
  validatePhone(controls) {
    const regExp = new RegExp(/^(01[2689]|09)[0-9]{8}$/);    
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatesdt': true }
    }
  }
  validatesdt(controls) {
    const regExp = new RegExp(/^(01[2689]|09)[0-9]{8}$/);    
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validatesdt': true }
    }
  }
  validateEmail(controls) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateEmail': true }
    }
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      phone:['', Validators.compose([
       Validators.required, // Field is required
        this.validatesdt
      ])],
      school: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ])],
      faculty: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      cvFile: ['', Validators.compose([
        Validators.required
      ])]


    });
  }


  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.myForm.patchValue({
          file: reader.result
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  disableForm() {
    this.myForm.controls['username'].disable();
    this.myForm.controls['sex'].disable();
    this.myForm.controls['email'].disable();
    this.myForm.controls['phone'].disable();
    this.myForm.controls['school'].disable();
    this.myForm.controls['faculty'].disable();
    this.myForm.controls['cvFile'].disable();
  }

  enableForm() {
    this.myForm.controls['username'].enable();
    this.myForm.controls['sex'].enable();
    this.myForm.controls['email'].enable();
    this.myForm.controls['phone'].enable();
    this.myForm.controls['school'].enable();
    this.myForm.controls['faculty'].enable();
    this.myForm.controls['cvFile'].enable();
  }



  ngOnInit() {

    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.news = data.news; // Save blog object for use in HTMLxx
        console.log(this.news);
        this.loading = false; // Allow loading of blog form
      }
    });

  }

}
