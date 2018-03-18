import { Component, OnInit } from '@angular/core';
import { GiftService } from '../../../service/gift.service';

@Component({
  selector: 'app-gau',
  templateUrl: './gau.component.html',
  styleUrls: ['./gau.component.css']
})
export class GauComponent implements OnInit {

  gift;
  
    constructor(
      private giftService: GiftService
  ) { }

  ngOnInit() {
    this.giftService.getAllGift().subscribe(data1 =>{
      this.gift = data1.listGift;
      console.log(this.gift);
    });
  }
}
