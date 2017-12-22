import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UvdanggtRoutingModule } from './uvdanggt-routing.module';
import { UvdanggtComponent } from './uvdanggt.component';
@NgModule({
    imports: [
        CommonModule,
        UvdanggtRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        UvdanggtComponent
    ]
})

export class UvdanggtModule {}