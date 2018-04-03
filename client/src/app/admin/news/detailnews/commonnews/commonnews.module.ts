import { CommonnewsComponent } from './commonnews.component';
import { CommonnewsRoutingModule } from './commonnews-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CommonnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        CommonnewsComponent
    ]
})

export class CommonnewsModule {}