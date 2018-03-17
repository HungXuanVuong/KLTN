import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletecatagoryRoutingModule } from './deletecatagory-routing.module';
import { DeletecatagoryComponent } from './deletecatagory.component';

@NgModule({
    imports: [
        CommonModule,
        DeletecatagoryRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        DeletecatagoryComponent
    ]
})

export class DeletecatagoryModule {}