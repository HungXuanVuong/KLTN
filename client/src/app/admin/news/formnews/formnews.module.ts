import { MyDatePickerModule } from 'mydatepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormnewsRoutingModule } from './formnews-routing.module';
import { FormnewsComponent } from './formnews.component';
import { EditorModule } from '@tinymce/tinymce-angular';

import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
    imports: [
        CommonModule,
        FormnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        EditorModule,
        CKEditorModule,
        MyDatePickerModule 

    ],
    declarations: [
        FormnewsComponent
    ]
})

export class FormnewsModule {}