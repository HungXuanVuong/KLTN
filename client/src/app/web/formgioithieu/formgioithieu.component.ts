import { PolicyService } from './../../service/policy.service';
import { Policy } from './../../models/policy';
import { CandidateService } from '../../service/candidate.service';
import { NewscandidateService } from '../../service/newscandidate.service';

import { NewsService } from '../../service/news.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { News } from '../../models/news';
import { User } from '../../models/user'
import { FileUploader } from 'ng2-file-upload';

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
  emailValid;
  emailMessage;

  phoneValid;
  phoneMessage;


  myForm: FormGroup;
  policy = new Policy();
  news = new News();
  point;
  user = new User();

  public uploaderCV: FileUploader = new FileUploader({ url: 'http://localhost:3000/authentication/uploadcv' });
  constructor(
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef,
    private newsCandidateService: NewscandidateService,
    private candidateService: CandidateService,
    private policyService: PolicyService
  ) {
    this.createForm();

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
      sex: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      phone: ['', Validators.compose([
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

    if (event.target.files && event.target.files.length) {
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

  RedirectUnregister() {
    this.router.navigate(['/redirectpage'],
      { queryParams: { mess: "Vui lòng đăng nhập thì mới truy cập được chức năng này !", messclas: "alert alert-danger" } });
  }

  redirectHome(){
    this.router.navigate(['/']);
  }
  checkAuth() {
    this.authService.getProfile().subscribe(data => {
      if (!data.success) {

        this.RedirectUnregister();
      } else {
        this.user = data.user;
      }
      this.loading = false;
    });
  }
  updatePointFileUser(idUser) {
    console.log(idUser);
    this.authService.findUserById(idUser).subscribe(user =>{
       this.point = user.user;
      console.log(this.point);
      this.point.point += this.policy.pointFile;
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
addCandidate(){
  this.currentUrl = this.activatedRoute.snapshot.params;
  this.processing = true;
  this.disableForm();
  const candidate = {
    username: this.myForm.get('username').value,
    sex: this.myForm.get('sex').value,
    email: this.myForm.get('email').value,
    phone: this.myForm.get('phone').value,
    school: this.myForm.get('school').value,
    faculty: this.myForm.get('faculty').value,
    cvFile: this.uploaderCV.queue[0].file.name
  }
  console.log(candidate);

  this.candidateService.addCandidate(candidate).subscribe(data => {
    if (!data.success) {
      this.messageClass = "alert alert-danger";
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = "alert alert-success";
      this.message = data.message;
    }
  });
}
  addNews_Candidate() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.processing = true;
    this.disableForm();
    const candidate = {
      username: this.myForm.get('username').value,
      sex: this.myForm.get('sex').value,
      email: this.myForm.get('email').value,
      phone: this.myForm.get('phone').value,
      school: this.myForm.get('school').value,
      faculty: this.myForm.get('faculty').value,
      cvFile: this.uploaderCV.queue[0].file.name
    }
    console.log(candidate);

    this.candidateService.addCandidate(candidate).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        console.log(data.candidate._id);
        this.uploaderCV.queue[0].upload();
        console.log(this.currentUrl.id);
        let newscandidate = {
          newsId: this.currentUrl.id,
          userId: this.user._id,
          candidateId: data.candidate._id,
          point: this.policy.pointFile
        };
        this.newsCandidateService.addNewsCandidate(newscandidate).subscribe(result => {
          if (!result.success) {
            this.messageClass = "alert alert-danger";
            this.message = result.message;
            this.processing = false;
            this.enableForm();
          } else {
            this.messageClass = "alert alert-success";
            this.message = result.message;
            // setTimeout(() =>{
            //   this.router.navigate(['/']);
            // }, 3000);
          }
        });

      }
    });


  }
  clearAllFields() {
    this.enableForm();
    this.myForm.reset();
  }

  cleanQueueUpload() {
    this.uploaderCV.queue[0].remove();
  }


  checkEmail() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsCandidateService.checkEmail(this.currentUrl.id, this.myForm.get('email').value).subscribe(data => {
      if (!data.success) {
        this.emailValid = false;
        this.emailMessage = data.message;
      } else {
        this.emailValid = true;
        this.emailMessage = data.message;
      }
    });
  }

  checkPhone() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsCandidateService.checkPhone(this.currentUrl.id, this.myForm.get('phone').value).subscribe(data => {
      if (!data.success) {
        this.phoneValid = false;
        this.phoneMessage = data.message;
      } else {
        this.phoneValid = true;
        this.phoneMessage = data.message;
      }
    });
  }


  ngOnInit() {


    this.checkAuth();
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.newsService.getSingleNews(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.news = data.news; // Save blog object for use in HTMLxx
        console.log(this.news);
        this.policyService.getSingle(data.news.newsPolicy).subscribe(policy => {
          if (!policy.success) {
            this.processing = false;
          } else {
            this.policy = policy.policy;
            //console.log(this.policy);
          }
        });
        this.loading = false; // Allow loading of blog form
        
      }
    });



  }

}
