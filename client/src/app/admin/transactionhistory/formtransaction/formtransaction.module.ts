import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormtransactionRoutingModule } from './formtransaction-routing.module';
import { FormtransactionComponent } from './formtransaction.component';

@NgModule({
    imports: [
        CommonModule,
        FormtransactionRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormtransactionComponent
    ]
})

export class FormtransactionModule {}