import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../../service/gift.service';
import { TypeGiftService } from '../../../service/type-gift.service';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  listgift: Object;
  dtOptions: DataTables.Settings = {};
  public temp_var: Object= false;
  listtypegift;
  giftbytype;
  status_Product='XEM_TAT_CA';

  constructor(
    private giftService: GiftService,
    private type_giftService: TypeGiftService
  ) { }

  getAllType() {
    this.type_giftService.getAllTypeGift().subscribe(data => {
      this.listtypegift = data.listTypegift;
    });
  }

  getAllGift() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.giftService.getAllGift().subscribe(data => {
      this.listgift = data.listGift;
      this.temp_var = true;
      console.log(this.listgift);
    });
  }

  selectPBHandle(event: any) {
    this.giftbytype = event.target.value;
    console.log(this.giftbytype);
  }
  // tslint:disable-next-line:member-ordering
  selectedTypegift;
  refeshPage() {
    this.selectedTypegift = null;
  }

  ngOnInit() {
    this.getAllGift();
    this.getAllType();
  }

}
