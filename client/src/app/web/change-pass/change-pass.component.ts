import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  message;
  messageClass;
  user;
  processing = false;
  currentUrl;
  loading = true;
  confirm;
  form: FormGroup;
  passValid;
  passMessage;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router) {this.createForm();}
    createForm() {
      this.form = this.formBuilder.group({
        current_pass: ['', Validators.required],
        password: ['', Validators.required],
        confirm: ['', Validators.required]
      }
      );
    }
    disableForm(){
      this.form.controls['current_pass'].disable();
    }
    enableForm(){
      this.form.controls['current_pass'].enable();
    }
    checkExitsPass(email) {
      this.authService.getProfile().subscribe(profile => {
        if(profile){
          this.user = profile.user;
        }else{
          return;
        }
      });
      this.disableForm();
      const user = {
        email: email,
        password: this.form.get('current_pass').value
      }
      this.authService.checkExitsPass(user).subscribe(data => {
        if (!data.success) {
          // set trang thai
          this.passValid = false;
          // set message api
          this.passMessage = data.message;
          this.enableForm();
        } else {
          this.passValid = true;
          this.passMessage = data.message;
        }
      });
    }
    changePassword(){
      this.processing = true; // Lock form fields
      // Function to send blog object to backend
      const user_ = {
        _id: this.user._id,
        password: this.form.get('password').value
      }
      this.authService.changePassword(user_).subscribe(data => {
        // Check if PUT request was a success or not
        if (!data.success) {
          this.messageClass = 'alert alert-danger'; // Set error bootstrap class
          this.message = data.message; // Set error message
          this.processing = false; // Unlock form fields
        } else {
          this.messageClass = 'alert alert-success'; // Set success bootstrap class
          this.message = data.message; // Set success message
          // After two seconds, navigate back to blog page
          setTimeout(() => {
            this.router.navigate(['/login']); // Navigate back to route page
          }, 2000);
        }
      });
     }
     checkConfirm(){
          if(!this.form.get('confirm').value){
            return true;
          }else{
            if(this.form.get('confirm').value === this.form.get('password').value){
              console.log('ok');
              return true;
            }else{
              console.log('not ok');
              return false;
            }
          }   
        }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.authService.findUserById(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.user = data.user; // Save blog object for use in HTML
       
        // this.user.password = '';
        this.loading = false; // Allow loading of blog form
        console.log(this.user);
      }
    });
  }

}
