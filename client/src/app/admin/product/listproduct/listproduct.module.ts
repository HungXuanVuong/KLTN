import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListproductRoutingModule } from './listproduct-routing.module';
import { ListproductComponent } from './listproduct.component';

@NgModule({
    imports: [
        CommonModule,
        ListproductRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListproductComponent
    ]
})

export class ListproductModule {}