import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteproductRoutingModule } from './deleteproduct-routing.module';
import { DeleteproductComponent } from './deleteproduct.component';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        DeleteproductRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MyDatePickerModule,
        FileUploadModule

    ],
    declarations: [
        DeleteproductComponent
    ]
})

export class DeleteproductModule {}
