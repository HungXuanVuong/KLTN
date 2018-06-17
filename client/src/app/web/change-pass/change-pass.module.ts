import { ChangePassComponent } from './change-pass.component';
import { ChangePassRoutingModule } from './change-pass-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ChangePassRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        ChangePassComponent
    ]
})

export class ChangePassModule {}