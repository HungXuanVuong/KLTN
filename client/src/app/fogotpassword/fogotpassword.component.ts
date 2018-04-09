import { AuthServiceService } from './../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fogotpassword',
  templateUrl: './fogotpassword.component.html',
  styleUrls: ['./fogotpassword.component.css']
})
export class FogotpasswordComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  email = '';

  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { this.createForm() }
  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])]
  });
}
validateEmail(controls) {
  const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (regExp.test(controls.value)) {
    return null;
  } else {
    return { 'validateEmail': true }
  }
}

checkExitsEmail() {
  this.authService.checkExitsEmail(this.form.get('email').value).subscribe(data => {
    if (!data.success) {
      // set trang thai
      this.emailValid = false;
      // set message api
      this.emailMessage = data.message;
    } else {
      this.emailValid = true;
      this.emailMessage = data.message;
    }
  });
}

disableForm() {
  this.form.controls['email'].disable();
}

enableForm() {
  this.form.controls['email'].enable();
}

test(){
  const user = {
    email : this.form.get('email').value
  }
  console.log(user.email);
  this.authService.resetPasswordSendMail(user).subscribe(data =>{
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
      }, 4000);
    }
  });
}

resetPassword(){
  this.processing = true;
  this.disableForm();
  this.authService.resetPasswordSendMail(this.email).subscribe(data =>{
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
  ngOnInit() {
    
  }

}
