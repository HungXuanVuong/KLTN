import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyService } from '../../../service/policy.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editchinhsach',
  templateUrl: './editchinhsach.component.html',
  styleUrls: ['./editchinhsach.component.css']
})
export class EditchinhsachComponent implements OnInit {
  message;
  messageClass;
  policy;
  processing = false;
  currentUrl;
  loading = true;
  form : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private policyService: PolicyService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(){
    this.form = this.formBuilder.group({
      // tên chính sách
      pName: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), 
        Validators.maxLength(50)
      ])],
      // điểm vòng hồ sơ
      pointFile: ['',
        Validators.required, // Field is required
      ],
      // điểm vòng phỏng vấn
      pointInterview: ['',
        Validators.required, // Field is required
      ],
      // điểm ký hợp đồng
      pointSign: ['',
        Validators.required, // Field is required
      ]
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

  updatepolicy() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.policyService.edit(this.policy).subscribe(data => {
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
          this.router.navigate(['/admin/listchinhsach']); // Navigate back to route page
        }, 2000);
      }
    });
  }
  goBack(){
    this.router.navigate(['/admin/listchinhsach']);
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.policyService.getSingle(this.currentUrl.id).subscribe(data =>{
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.policy = data.policy; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });
  }

}

