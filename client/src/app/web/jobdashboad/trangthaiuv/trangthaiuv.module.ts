import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrangthaiuvRoutingModule } from './trangthaiuv-routing.module';
import { TrangthaiuvComponent } from './trangthaiuv.component';

@NgModule({
    imports: [
        CommonModule,
        TrangthaiuvRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        TrangthaiuvComponent
    ]
})

export class TrangthaiuvModule {}