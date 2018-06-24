import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../service/order.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edittransaction',
  templateUrl: './edittransaction.component.html',
  styleUrls: ['./edittransaction.component.css']
})
export class EdittransactionComponent implements OnInit {

  message;
  messageClass;
  order;
  processing = false;
  processing2 = false;
  currentUrl;
  loading = true;
  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      codeOrder: ['', Validators.required],
      productName: ['', Validators.required],
      point_qd: ['', Validators.required],
      placeOfReceipt: ['', Validators.required],
      employee: ['', Validators.required],
      orderDay: ['', Validators.required],
      receivedDay: ['', Validators.required],
      employeeSetStatus: ['', Validators.required]
    });
  }
  clearAllFields() {
    this.createForm();
  }

  disableForm() {
    this.form.controls['codeOrder'].disable();
    this.form.controls['productName'].disable();
    this.form.controls['point_qd'].disable();
    this.form.controls['employee'].disable();
    this.form.controls['orderDay'].disable();
    this.form.controls['receivedDay'].disable();
    this.form.controls['employeeSetStatus'].disable();
  }
  updateOrder() {
    this.processing2 = true;
    this.processing = true; // Lock form fields
    console.log(this.order);
    // Function to send blog object to backend
    this.orderService.editOrder(this.order).subscribe(data => {
    //   // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing2 = false;
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/admin/listtransaction']); // Navigate back to route page
        }, 2000);
      }
    });
  }
  goBack() {
    this.router.navigate(['/admin/listtransaction']);
  }
  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.orderService.getOrderByID(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.order = data.order; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
        this.processing = true;
      }
    });
  }

}

