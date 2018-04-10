import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GauRoutingModule } from './gau-routing.module';
import { GauComponent } from './gau.component';
@NgModule({
    imports: [
        CommonModule,
        GauRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        GauComponent
    ]
})

export class GauModule {}