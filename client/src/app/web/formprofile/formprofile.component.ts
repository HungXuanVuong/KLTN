import { User } from '../../models/user';
import { NewsService } from '../../service/news.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../service/auth-service.service';
import { News } from '../../models/news';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-formprofile',
  templateUrl: './formprofile.component.html',
  styleUrls: ['./formprofile.component.css']
})
export class FormprofileComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/authentication/upload' });
  public uploaderCV: FileUploader = new FileUploader({ url: 'http://localhost:3000/authentication/uploadcv' });

  model: any;
  message;
  messageClass;

  processing = false;
  currentUrl;
  loading = true;

  news = new News();

  user = new User();

  userImage:any = '../../../assets/web/img/imguser/';

  constructor(
    private authService: AuthServiceService,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) { }

  sex: string = 'Nam';
  selectSexHandle(event: any) {
    this.sex = event.target.value;
    console.log(this.sex);
  }
  selectedSex: Object = {};

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
  };
  onDateChanged(event: IMyDateModel) {
    this.model = event.jsdate;
    console.log(this.model);
  }

  uploadAvatar() {
      console.log(this.uploader.queue[0].file.name);
      let userNew = {
        _id: this.user._id,
        urlHinh: this.uploader.queue[0].file.name
      };
      console.log(userNew);
      this.authService.editAvatarUser(userNew).subscribe(data => {
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; 
          this.message = data.message; 
          this.processing = false; 
        } else {
          this.uploader.queue[0].upload();
          this.messageClass = 'alert alert-success'; 
          this.message = data.message;
           this.ngOnInit();
        }
      });
    

  }

  updateUser(){
    this.processing = true;
    this.user.dateOfBirth = this.model.jsdate;
    console.log(this.model);
    this.user.sex = this.sex;
    console.log(this.uploaderCV.queue[0].file.name);
    this.user.cvFile = this.uploaderCV.queue[0].file.name;

    this.authService.editUser(this.user).subscribe(data =>{
       if (!data.success) {
            this.messageClass = 'alert alert-danger'; 
            this.message = data.message;
            this.processing = false; 
          } else {
            this.uploaderCV.queue[0].upload();
            this.messageClass = 'alert alert-success'; 
            this.message = data.message; 
            setTimeout(() =>{
              this.router.navigate(['/profiledetail/'+this.user._id]);
            }, 1000);
          }
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; 
        this.message = data.message; 
      } else {
        this.user = data.user;
        var d = new Date(data.user.dateOfBirth);
        this.model = {
          date: {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
          }
        }
        this.loading = false;
      }

    });
  }

}
