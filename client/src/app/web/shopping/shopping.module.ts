import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingComponent } from './shopping.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { NoelComponent } from './noel/noel.component';
import { GauComponent } from './gau/gau.component';

@NgModule({
    imports: [
        CommonModule,
        ShoppingRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        ShoppingComponent,
        SlidebarComponent
    ]
})

export class ShoppingModule {}