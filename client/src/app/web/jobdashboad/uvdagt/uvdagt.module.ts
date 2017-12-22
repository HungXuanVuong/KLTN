import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UvdagtRoutingModule } from './uvdagt-routing.module';
import { UvdagtComponent } from './uvdagt.component';

@NgModule({
    imports: [
        CommonModule,
        UvdagtRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        UvdagtComponent
    ]
})

export class UvdagtModule {}