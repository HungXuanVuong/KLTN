import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PolicyService } from '../../../service/policy.service';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-formchinhsach',
  templateUrl: './formchinhsach.component.html',
  styleUrls: ['./formchinhsach.component.css']
})
export class FormchinhsachComponent implements OnInit {
  form : FormGroup;
  message;
  messageClass;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private policyService : PolicyService
  ) 
  { 
    this.createForm();
  }

  validateNumberOf(controls) {
    const regExp = new RegExp(/[0-9]/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateNumberOf': true }
    }
  }

  createForm(){
    this.form = this.formBuilder.group({
      // tên chính sách
      pName: ['', Validators.compose([
        Validators.required, 
        Validators.maxLength(20),
        Validators.minLength(2)
      ])],
      // điểm vòng hồ sơ
      pointFile: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        this.validateNumberOf
      ])],
      // điểm vòng phỏng vấn
      pointInterview: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        this.validateNumberOf
      ])],
      // điểm ký hợp đồng
      pointSign: ['', Validators.compose([
        Validators.required,
        Validators.min(0),
        this.validateNumberOf
      ])]
    });
  }
  clearAllFields(){
    this.createForm();
  }
  disableForm() {
    this.form.controls['pName'].disable();
    this.form.controls['pointFile'].disable();
    this.form.controls['pointInterview'].disable();
    this.form.controls['pointSign'].disable();
  }

  enableForm(){
    this.form.controls['pName'].enable();
    this.form.controls['pointFile'].enable();
    this.form.controls['pointInterview'].enable();
    this.form.controls['pointSign'].enable();
  }
  addPolicy(){
    this.processing = true;
    this.disableForm();
    const policy = {
      pName: this.form.get('pName').value,
      pointFile: this.form.get('pointFile').value,
      pointInterview: this.form.get('pointInterview').value,
      pointSign: this.form.get('pointSign').value
    }
    this.policyService.add(policy).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/admin/listchinhsach']);
        }, 2000);
      }
    });
  }
  ngOnInit() {
  }

}
