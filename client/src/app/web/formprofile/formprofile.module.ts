import { FormprofileComponent } from './formprofile.component';
import { FormprofileRoutingModule } from './formprofile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormprofileRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        FormprofileComponent
    ]
})

export class FormprofileModule {}