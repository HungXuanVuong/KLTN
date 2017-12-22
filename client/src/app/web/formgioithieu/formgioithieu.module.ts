import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormgioithieuRoutingModule } from './formgioithieu-routing.module';
import { FormgioithieuComponent } from './formgioithieu.component';

@NgModule({
    imports: [
        CommonModule,
        FormgioithieuRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        FormgioithieuComponent
    ]
})

export class FormgioithieuModule {}