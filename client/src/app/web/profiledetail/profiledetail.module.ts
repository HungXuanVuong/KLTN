import { ProfiledetailComponent } from './profiledetail.component';
import { ProfiledetailRoutingModule } from './profile-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ProfiledetailRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ProfiledetailComponent
    ]
})

export class ProfiledetailModule {}