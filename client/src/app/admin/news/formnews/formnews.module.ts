import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormnewsRoutingModule } from './formnews-routing.module';
import { FormnewsComponent } from './formnews.component';

@NgModule({
    imports: [
        CommonModule,
        FormnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormnewsComponent
    ]
})

export class FormnewsModule {}