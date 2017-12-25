import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormcatagoryRoutingModule } from './formcatagory-routing.module';
import { FormcatagoryComponent } from './formcatagory.component';

@NgModule({
    imports: [
        CommonModule,
        FormcatagoryRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormcatagoryComponent
    ]
})

export class FormcatagoryModule {}