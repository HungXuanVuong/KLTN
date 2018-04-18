import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListnewsRoutingModule } from './listnews-routing.module';
import { ListnewsComponent } from './listnews.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        ListnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

    ],
    declarations: [
        ListnewsComponent,
        
    ]
})

export class ListnewsModule {}