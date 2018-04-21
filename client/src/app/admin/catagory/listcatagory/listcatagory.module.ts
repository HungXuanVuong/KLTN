import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListcatagoryRoutingModule } from './listcatagory-routing.module';
import { ListcatagoryComponent } from './listcatagory.component';

@NgModule({
    imports: [
        CommonModule,
        ListcatagoryRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule
    ],
    declarations: [
        ListcatagoryComponent
    ]
})

export class ListcatagoryModule {}