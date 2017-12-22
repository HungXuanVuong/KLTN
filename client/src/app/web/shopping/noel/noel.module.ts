import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoelRoutingModule } from './noel-routing.module';
import { NoelComponent } from './noel.component';
@NgModule({
    imports: [
        CommonModule,
        NoelRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        NoelComponent
    ]
})

export class NoelModule {}