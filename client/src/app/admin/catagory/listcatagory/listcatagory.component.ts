import { Component, OnInit } from '@angular/core';
import { TypeGiftService } from '../../../service/type-gift.service';

@Component({
  selector: 'app-listcatagory',
  templateUrl: './listcatagory.component.html',
  styleUrls: ['./listcatagory.component.css']
})
export class ListcatagoryComponent implements OnInit {
typegift;
  constructor(
    private type_giftService: TypeGiftService
  ) { }

  ngOnInit() {
    this.type_giftService.getAllTypeGift().subscribe(data2 =>{
      this.typegift = data2.listTypegift;
      console.log(this.typegift);
    });
  }

}
