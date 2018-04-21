import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdittransactionRoutingModule } from './edittransaction-routing.module';
import { EdittransactionComponent } from './edittransaction.component';

@NgModule({
    imports: [
        CommonModule,
        EdittransactionRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EdittransactionComponent
    ]
})

export class EdittransactionModule {}