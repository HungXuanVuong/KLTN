import { Component, OnInit } from '@angular/core';
import { TypeGiftService } from '../../../service/type-gift.service';
import { AuthServiceService } from '../../../service/auth-service.service';
import { GiftService } from '../../../service/gift.service';
import { Typegift } from './../../../models/typegift';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  public model;
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/authentication/upload' });
  form: FormGroup;
  message;
  messageClass;
  currentUrl;
  loading = true;
  processing = false;
  processing2 = false;
  typegiftList: Array<Typegift> = [];
  typegift = new Typegift();
  gift;

  productTypegift = '';
  selectedTypegift: Object = {};

  expDate: any;
  saved = true;
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private type_giftService: TypeGiftService,
    private giftService: GiftService
  ) { this.createForm(); }

  validateNumberOf(controls) {
    const regExp = new RegExp(/[0-9]/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return { 'validateNumberOf': true };
    }
  }
  selectTypegiftHandle(event: any) {
    this.productTypegift = event.target.value;
  }
  createForm() {
    this.form = this.formBuilder.group({
      product_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40)
      ])],
      point_sp: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        this.validateNumberOf
      ])],
      trademark: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15)
      ])],
      amount: ['', Validators.compose([
        Validators.required,
        Validators.min(1),
        this.validateNumberOf
      ])],
      create_date: ['', Validators.compose([
        Validators.required
      ])],
      product_infor: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500)
      ])]
    });
  }
  onDateChanged(event: IMyDateModel) {
    this.expDate = event.jsdate;
    console.log(this.expDate);
   // console.log(this.nhanvienDate);
  }
  updateProduct() {
    this.processing = true; // Lock form fields
    this.processing2 = true; // Lock form fields
    // Function to send blog object to backend
    this.giftService.editGift(this.gift).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
        this.processing2 = false; // Lock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = 'Cập nhật quà thành công!'; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/admin/listproduct']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin/listproduct']);
  }
  getAllTypegift() {
    this.type_giftService.getAllTypeGift().subscribe(data => {
      this.typegiftList = data.listTypegift;
    });
  }
  ngOnInit() {
    this.getAllTypegift();
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.giftService.getGiftId(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
      } else {
        this.gift = data.gift; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
        this.processing2 = true;
      }
    });
  }
}
