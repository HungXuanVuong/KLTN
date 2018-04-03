import { CostprocessComponent } from './costprocess.component';
import { CostprocessRoutingModule } from './costprocess-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CostprocessRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        CostprocessComponent
    ]
})

export class CostprocessModule {}