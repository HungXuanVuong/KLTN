import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletetransactionRoutingModule } from './deletetransaction-routing.module';
import { DeletetransactionComponent } from './deletetransaction.component';

@NgModule({
    imports: [
        CommonModule,
        DeletetransactionRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        DeletetransactionComponent
    ]
})

export class DeletetransactionModule {}