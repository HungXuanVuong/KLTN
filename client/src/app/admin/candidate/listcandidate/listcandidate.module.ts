import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListcandidateRoutingModule } from './listcandidate-routing.module';
import { ListcandidateComponent } from './listcandidate.component';

@NgModule({
    imports: [
        CommonModule,
        ListcandidateRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListcandidateComponent
    ]
})

export class ListcandidateModule {}