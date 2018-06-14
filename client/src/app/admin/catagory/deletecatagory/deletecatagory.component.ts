import { Component, OnInit } from '@angular/core';
import { TypeGiftService } from '../../../service/type-gift.service';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-deletecatagory',
  templateUrl: './deletecatagory.component.html',
  styleUrls: ['./deletecatagory.component.css'],
  animations: [routerTransition()]
})
export class DeletecatagoryComponent implements OnInit {
  message;
  messageClass;
  foundTypeGift = false;
  processing = false;
  typegift;
  currentUrl;

  constructor(
    private typeGiftService: TypeGiftService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  deleteTypeGift() {
    this.processing = true; // Disable button
    this.typeGiftService.deleteTypeGift(this.currentUrl.id).subscribe(data => {
      // check yeu cau xoa
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.router.navigate(['/admin/listcatagory']);
        }, 2000);
      }
    });
  }


  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // get URL paramon page load
    this.typeGiftService.getDetailTypeGift(this.currentUrl.id).subscribe(data => {
      if (!data.success) {
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      }else {
        this.typegift = {
          type_name: data.typegift.type_name,
          type_infor: data.typegift.type_infor
        };
        this.foundTypeGift = true;
      }
    });
  }

}
