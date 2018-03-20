import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-register1',
  templateUrl: './register1.component.html',
  styleUrls: ['./register1.component.css']
})
export class Register1Component implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;

  constructor( 
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) { this.createForm() }

  createForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        // Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ])],
      phone:['', Validators.compose([
        // Validators.required, // Field is required
        this.validatePhone
      ])]
  });
}

validatePhone(controls) {
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


checkEmail() {
  this.authService.checkEmail(this.form.get('email').value).subscribe(data => {
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
  this.form.controls['username'].disable();
}

enableForm() {
  this.form.controls['email'].enable();
  this.form.controls['username'].enable();
}
onRegisterSubmit() {
  
  this.processing = true;
  this.disableForm();
  const user = {
    email: this.form.get('email').value,
    username: this.form.get('username').value,
    phone: this.form.get('phone').value
  }
  this.authService.registerUserWithEmail(user).subscribe(data => {
    if (!data.success) {
      this.messageClass = "alert alert-danger";
      this.message = data.message;
      this.processing = false;
      this.enableForm();
    } else {
      this.messageClass = "alert alert-success";
      this.message = data.message;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  });
}
  ngOnInit() {
    
  }

}
