import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsharedRoutingModule } from './formshared-routing.module';
import { FormsharedComponent } from './formshared.component';

@NgModule({
    imports: [
        CommonModule,
        FormsharedRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormsharedComponent
    ]
})

export class FormsharedModule {}