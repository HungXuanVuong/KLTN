import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormchinhsachRoutingModule } from './formchinhsach-routing.module';
import { FormchinhsachComponent } from './formchinhsach.component';

@NgModule({
    imports: [
        CommonModule,
        FormchinhsachRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormchinhsachComponent
    ]
})

export class FormchinhsachModule {}