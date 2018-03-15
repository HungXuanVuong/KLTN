import { FogotpasswordComponent } from './fogotpassword.component';
import { FogotpasswordRoutingModule } from './fogotpassword-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        FogotpasswordRoutingModule,
        ReactiveFormsModule,
        FormsModule

    ],
    declarations: [
        FogotpasswordComponent
    ]
})

export class FogotpasswordModule {}