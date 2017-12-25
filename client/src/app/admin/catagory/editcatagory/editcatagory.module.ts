import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditcatagoryRoutingModule } from './editcatagory-routing.module';
import { EditcatagoryComponent } from './editcatagory.component';

@NgModule({
    imports: [
        CommonModule,
        EditcatagoryRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditcatagoryComponent
    ]
})

export class EditcatagoryModule {}