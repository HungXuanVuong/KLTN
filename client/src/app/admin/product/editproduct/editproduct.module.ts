import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditproductRoutingModule } from './editproduct-routing.module';
import { EditproductComponent } from './editproduct.component';

@NgModule({
    imports: [
        CommonModule,
        EditproductRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditproductComponent
    ]
})

export class EditproductModule {}