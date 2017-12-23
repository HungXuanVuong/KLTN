import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditsharedRoutingModule } from './editshared-routing.module';
import { EditsharedComponent } from './editshared.component';

@NgModule({
    imports: [
        CommonModule,
        EditsharedRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditsharedComponent
    ]
})

export class EditsharedModule {}