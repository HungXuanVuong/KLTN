import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormgioithieuRoutingModule } from './formgioithieu-routing.module';
import { FormgioithieuComponent } from './formgioithieu.component';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        FormgioithieuRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        FileUploadModule
        
    ],
    declarations: [
        FormgioithieuComponent,
    ]
})

export class FormgioithieuModule {}