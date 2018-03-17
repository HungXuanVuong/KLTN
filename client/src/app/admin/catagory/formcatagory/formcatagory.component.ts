import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeGiftService } from '../../../service/type-gift.service';

@Component({
  selector: 'app-formcatagory',
  templateUrl: './formcatagory.component.html',
  styleUrls: ['./formcatagory.component.css']
})
export class FormcatagoryComponent implements OnInit {
  form : FormGroup;
  message;
  messageClass;
  processing = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private typegiftService : TypeGiftService
  ) { 
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      // tên loại quà
      type_name: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), 
        Validators.maxLength(50)
      ])],
      // thông tin loại quà quy đổi Input
      type_infor: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(50),
        Validators.maxLength(500), 
      
      ])]
    });
  }
 
  clearAllFields(){
    this.createForm();
  }
  
  disableForm() {
    this.form.controls['type_name'].disable();
    this.form.controls['type_infor'].disable();
  }

  enableForm(){
    this.form.controls['type_name'].enable();
    this.form.controls['type_infor'].enable();
  }
  addTypeGift(){
    this.processing = true;
    this.disableForm();
    const typegift = {
      type_name: this.form.get('type_name').value,
      type_infor: this.form.get('type_infor').value
    }
    this.typegiftService.addTypeGift(typegift).subscribe(data => {
      if (!data.success) {
        this.messageClass = "alert alert-danger";
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = "alert alert-success";
        this.message = data.message;
        setTimeout(() =>{
          this.router.navigate(['/admin/listcatagory']);
        }, 2000);
      }
    });
  }


  ngOnInit() {
  }

}
