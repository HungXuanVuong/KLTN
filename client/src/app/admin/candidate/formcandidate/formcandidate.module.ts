import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormcandidateRoutingModule } from './formcandidate-routing.module';
import { FormcandidateComponent } from './formcandidate.component';

@NgModule({
    imports: [
        CommonModule,
        FormcandidateRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormcandidateComponent
    ]
})

export class FormcandidateModule {}