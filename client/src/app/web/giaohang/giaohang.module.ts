import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GiaohangRoutingModule } from './giaohang-routing.module';
import { GiaohangComponent } from './giaohang.component';

@NgModule({
    imports: [
        CommonModule,
        GiaohangRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        GiaohangComponent
    ]
})

export class GiaohangModule {}