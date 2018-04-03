import { HandlingprocessComponent } from './handlingprocess.component';
import { HandlingprocessRoutingModule } from './handlingprocess-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        HandlingprocessRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        HandlingprocessComponent
    ]
})

export class HandlingprocessModule {}