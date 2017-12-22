import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { JobdashboadComponent } from './jobdashboad.component';
import { JobdashboadRoutingModule } from './jobdashboad-routing.module';

@NgModule({
    imports: [
        CommonModule,
        JobdashboadRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        JobdashboadComponent
    ]
})

export class JobdashboadModule {}