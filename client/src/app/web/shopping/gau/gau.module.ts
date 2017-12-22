import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GauRoutingModule } from './gau-routing.module';
import { GauComponent } from './gau.component';
@NgModule({
    imports: [
        CommonModule,
        GauRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        GauComponent
    ]
})

export class GauModule {}