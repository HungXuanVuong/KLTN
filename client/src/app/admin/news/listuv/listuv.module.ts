import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListuvRoutingModule } from './listuv-routing.module';
import { ListuvComponent } from './listuv.component';

@NgModule({
    imports: [
        CommonModule,
        ListuvRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListuvComponent 
    ]
})

export class ListuvModule {}