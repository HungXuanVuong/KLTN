import { Register1Component } from './register1.component';
import { Register1RoutingModule } from './register1-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Register1RoutingModule,
        ReactiveFormsModule,
        MyDatePickerModule
    ],
    declarations: [
        Register1Component
    ]
})

export class Register1Module {}