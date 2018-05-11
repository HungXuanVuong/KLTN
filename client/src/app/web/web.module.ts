import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebRoutingModule } from './web-routing.module';
import { WebComponent } from './web.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


@NgModule({
    imports: [
        CommonModule,
        WebRoutingModule

    ],
    declarations: [
        WebComponent,
        HeaderComponent,
        FooterComponent,
        // FileSelectDirective
    ]
})

export class WebModule {}