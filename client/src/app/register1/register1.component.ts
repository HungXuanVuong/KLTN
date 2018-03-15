import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor( private formBuilder: FormBuilder,
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
  ngOnInit() {
    
  }

}
