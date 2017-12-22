import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChitiettinRoutingModule } from './chitiettin-routing.module';
import { ChitiettinComponent } from './chitiettin.component';

@NgModule({
    imports: [
        CommonModule,
        ChitiettinRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ChitiettinComponent
    ]
})

export class ChitiettinModule {}