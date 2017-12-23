import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListuserRoutingModule } from './listuser-routing.module';
import { ListuserComponent } from './listuser.component';

@NgModule({
    imports: [
        CommonModule,
        ListuserRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        ListuserComponent
    ]
})

export class ListuserModule {}