import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListsharedRoutingModule } from './listshared-routing.module';
import { ListsharedComponent } from './listshared.component';
import {TableModule} from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        ListsharedRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        TableModule,
        NgxPaginationModule,

    ],
    declarations: [
        ListsharedComponent
    ]
})

export class ListsharedModule {}