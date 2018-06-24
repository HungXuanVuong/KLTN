import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeGiftService } from '../../../service/type-gift.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editcatagory',
  templateUrl: './editcatagory.component.html',
  styleUrls: ['./editcatagory.component.css']
})
export class EditcatagoryComponent implements OnInit {
  message;
  messageClass;
  typegift;
  processing = false;
  currentUrl;
  loading = true;
  form : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private typegiftService: TypeGiftService,
    private router: Router
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
  updatetypegift() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.typegiftService.editTypeGift(this.typegift).subscribe(data => {
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
          this.router.navigate(['/admin/listcatagory']); // Navigate back to route page
        }, 2000);
      }
    });
  }
  goBack(){
    this.router.navigate(['/admin/listcatagory']);
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.typegiftService.getDetailTypeGift(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.typegift = data.typegift; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });
  }

}
