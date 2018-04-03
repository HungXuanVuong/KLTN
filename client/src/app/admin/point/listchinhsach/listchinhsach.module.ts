import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListchinhsachRoutingModule } from './listchinhsach-routing.module';
import { ListchinhsachComponent } from './listchinhsach.component';

@NgModule({
    imports: [
        CommonModule,
        ListchinhsachRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

    ],
    declarations: [
        ListchinhsachComponent
    ]
})

export class ListchinhsachModule {}