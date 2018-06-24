import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CheckorderRoutingModule } from './checkorder-routing.module';
import { CheckorderComponent } from './checkorder.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterOrderPipe } from './pipeSearchOrder.pipe';
@NgModule({
    imports: [
        CommonModule,
        CheckorderRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule
    ],
    declarations: [
        CheckorderComponent,
        FilterOrderPipe
    ]
})

export class CheckorderModule {}