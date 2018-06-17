import { Component, OnInit } from '@angular/core';
import { User } from './../../../models/user';
import { TypeGiftService } from '../../../service/type-gift.service';
import { AuthServiceService } from '../../../service/auth-service.service';
import { GiftService } from '../../../service/gift.service';
import { Typegift } from './../../../models/typegift';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formproduct',
  templateUrl: './formproduct.component.html',
  styleUrls: ['./formproduct.component.css']
})
export class FormproductComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  public model: any = { date: { year: 2018, month: 5, day: 9 } };
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/authentication/upload' });
  form: FormGroup;
  message;
  messageClass;
  processing = false;
  typegiftList: Array<Typegift> = [];
  typegift = new Typegift();

  productTypegift = '';
  selectedTypegift: Object = {};

  user = new User();
  userId = '';
  expDate: any;
  saved = true;
  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
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
      create_date: [this.model, Validators.compose([
        Validators.required
      ])],
      product_infor: ['', Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(500)
      ])]
    });
  }
  disableForm() {
    this.form.controls['product_name'].disable();
    this.form.controls['point_sp'].disable();
    this.form.controls['trademark'].disable();
    this.form.controls['amount'].disable();
    this.form.controls['create_date'].disable();
    this.form.controls['product_infor'].disable();
  }
  enableForm() {
    this.form.controls['product_name'].enable();
    this.form.controls['point_sp'].enable();
    this.form.controls['trademark'].enable();
    this.form.controls['amount'].enable();
    this.form.controls['create_date'].enable();
    this.form.controls['product_infor'].enable();
  }
  onDateChanged(event: IMyDateModel): void {
    this.expDate = event.jsdate;
    console.log(this.expDate);
   // console.log(this.nhanvienDate);
  }

  addProduct() {
    this.processing = true;
    this.disableForm();
    const product = {
      urlHinh: this.uploader.queue[0].file.name,
      product_name: this.form.get('product_name').value,
      point_sp: this.form.get('point_sp').value,
      trademark: this.form.get('trademark').value,
      amount: this.form.get('amount').value,
      product_infor: this.form.get('product_infor').value,
      create_date: this.expDate,
      type_giftID: this.productTypegift,
      employee: this.userId,
    };
    console.log(product);
    this.giftService.insertGift(product).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = 'Thêm quà thành công!';
        setTimeout(() => {
          this.router.navigate(['/admin/listproduct']);
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
    this.authService.getProfile().subscribe(profile => {
      if (profile) {
        this.userId = profile.user._id;
      }else {
        return;
      }
    });
  }

  isProductValid() {
    return this.form.controls.product_name.errors.required && this.form.controls.product_name.dirty;
  }

}
