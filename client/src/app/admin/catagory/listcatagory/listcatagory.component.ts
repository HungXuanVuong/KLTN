import { Component, OnInit } from '@angular/core';
import { TypeGiftService } from '../../../service/type-gift.service';
import { DataTablesModule } from 'angular-datatables';
import {BrowserModule} from '@angular/platform-browser';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listcatagory',
  templateUrl: './listcatagory.component.html',
  styleUrls: ['./listcatagory.component.css']
})
export class ListcatagoryComponent implements OnInit {
typegift: Object;
dtOptions: DataTables.Settings = {};
public temp_var: Object=false;
  constructor(
    private type_giftService: TypeGiftService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
    };
    this.type_giftService.getAllTypeGift().subscribe(data2 =>{
      this.typegift = data2.listTypegift;
      this.temp_var=true;
      console.log(this.typegift);
    });
  }

}
