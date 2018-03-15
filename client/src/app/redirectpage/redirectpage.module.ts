import { RedirectpageComponent } from './redirectpage.component';
import { RedirectpageRoutingModule } from './redirectpage-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    imports: [
        CommonModule,
        RedirectpageRoutingModule

    ],
    declarations: [
        RedirectpageComponent
    ]
})

export class RedirectpageModule {}