import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditchinhsachRoutingModule } from './editchinhsach-routing.module';
import { EditchinhsachComponent } from './editchinhsach.component';

@NgModule({
    imports: [
        CommonModule,
        EditchinhsachRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EditchinhsachComponent
    ]
})

export class EditchinhsachModule {}