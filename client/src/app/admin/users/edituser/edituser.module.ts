import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdituserRoutingModule } from './edituser-routing.module';
import { EdituserComponent } from './edituser.component';

@NgModule({
    imports: [
        CommonModule,
        EdituserRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        EdituserComponent
    ]
})

export class EdituserModule {}