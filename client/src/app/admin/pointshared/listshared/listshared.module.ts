import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListsharedRoutingModule } from './listshared-routing.module';
import { ListsharedComponent } from './listshared.component';

@NgModule({
    imports: [
        CommonModule,
        ListsharedRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListsharedComponent
    ]
})

export class ListsharedModule {}