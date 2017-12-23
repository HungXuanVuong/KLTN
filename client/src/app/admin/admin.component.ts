import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

declare var jQuery:any;


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // $(function() {
    //   jQuery('#side-menu').metisMenu();
    // });
    jQuery('#side-menu').metisMenu();
  }

}
