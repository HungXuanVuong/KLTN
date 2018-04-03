import { DetailnewsRoutingModule } from './detailnews-routing.module';
import { DetailnewsComponent } from './detailnews.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonnewsComponent } from './commonnews/commonnews.component';
import { HandlingprocessComponent } from './handlingprocess/handlingprocess.component';
import { CostprocessComponent } from './costprocess/costprocess.component';

@NgModule({
    imports: [
        CommonModule,
        DetailnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

    ],
    declarations: [
        DetailnewsComponent,
        // CommonnewsComponent,
        // HandlingprocessComponent,
        // CostprocessComponent
    ]
})

export class DetailnewsModule {}