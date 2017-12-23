import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditcandidateRoutingModule } from './editcandidate-routing.module';
import { EditcandidateComponent } from './editcandidate.component';

@NgModule({
    imports: [
        CommonModule,
        EditcandidateRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditcandidateComponent
    ]
})

export class EditcandidateModule {}