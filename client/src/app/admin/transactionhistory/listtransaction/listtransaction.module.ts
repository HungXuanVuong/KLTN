import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListtransactionRoutingModule } from './listtransaction-routing.module';
import { ListtransactionComponent } from './listtransaction.component';

@NgModule({
    imports: [
        CommonModule,
        ListtransactionRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

    ],
    declarations: [
        ListtransactionComponent
    ]
})

export class ListtransactionModule {}