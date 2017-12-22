import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GiohangRoutingModule } from './giohang-routing.module';
import { GiohangComponent } from './giohang.component';
@NgModule({
    imports: [
        CommonModule,
        GiohangRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        GiohangComponent
    ]
})

export class GiohangModule {}