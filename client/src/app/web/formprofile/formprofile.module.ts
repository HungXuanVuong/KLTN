import { FormprofileComponent } from './formprofile.component';
import { FormprofileRoutingModule } from './formprofile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        FormprofileRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MyDatePickerModule,
        FileUploadModule
    ],
    declarations: [
        FormprofileComponent,
       
    ]
})

export class FormprofileModule {}