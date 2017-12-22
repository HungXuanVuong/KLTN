import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';



@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule

    ],
    declarations: [
        LoginComponent
    ]
})

export class LoginModule {}