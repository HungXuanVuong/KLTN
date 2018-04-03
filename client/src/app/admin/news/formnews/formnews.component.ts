import { Policy } from './../../../models/policy';
import { IMyDpOptions } from 'mydatepicker';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
 public model: any = { date: { year: 2018, month: 5, day: 9 } };

 myForm: FormGroup;
 message;
 messageClass;
 processing = false;
 
 policy : Array<Policy> = [];

saved = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    
  ) { }

  ngOnInit() {
    
  }

  onChange(){
    // console.log('Change');
    // console.log(this.ckeditorContent);
  }


}
