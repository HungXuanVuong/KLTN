import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormupdateuvRoutingModule } from './formupdateuv-routing.module';
import { FormupdateuvComponent } from './formupdateuv.component';

@NgModule({
    imports: [
        CommonModule,
        FormupdateuvRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FormupdateuvComponent 
    ]
})

export class FormupdateuvModule {}