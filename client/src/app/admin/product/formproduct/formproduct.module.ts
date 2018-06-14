import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormproductRoutingModule } from './formproduct-routing.module';
import { FormproductComponent } from './formproduct.component';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        FormproductRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MyDatePickerModule,
        FileUploadModule
    ],
    declarations: [
        FormproductComponent
    ]
})

export class FormproductModule {}