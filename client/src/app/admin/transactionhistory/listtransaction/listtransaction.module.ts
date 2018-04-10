import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListtransactionRoutingModule } from './listtransaction-routing.module';
import { ListtransactionComponent } from './listtransaction.component';
import { DataTablesModule } from 'angular-datatables';

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