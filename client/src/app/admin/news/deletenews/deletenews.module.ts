import { DeletenewsRoutingModule } from './deletenews-routing.module';
import { DeletenewsComponent } from './deletenews.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        DeletenewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule

    ],
    declarations: [
        DeletenewsComponent
    ]
})

export class DeletenewsModule {}