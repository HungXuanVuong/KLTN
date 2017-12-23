import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditnewsRoutingModule } from './editnews-routing.module';
import { EditnewsComponent } from './editnews.component';

@NgModule({
    imports: [
        CommonModule,
        EditnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditnewsComponent
    ]
})

export class EditnewsModule {}