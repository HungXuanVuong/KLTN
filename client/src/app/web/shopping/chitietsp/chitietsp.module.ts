import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChitietspRoutingModule } from './chitietsp-routing.module';
import { ChitietspComponent } from './chitietsp.component';
@NgModule({
    imports: [
        CommonModule,
        ChitietspRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ChitietspComponent
    ]
})

export class ChitietspModule {}