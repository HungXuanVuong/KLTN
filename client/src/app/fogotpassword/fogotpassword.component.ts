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

  constructor(
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
  ngOnInit() {
    
  }

}
