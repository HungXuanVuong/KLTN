import { DetailnewsRoutingModule } from './detailnews-routing.module';
import {DetailnewsComponent } from './detailnews.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { CommonnewsComponent } from './commonnews/commonnews.component';
import { HandlingprocessComponent } from './handlingprocess/handlingprocess.component';
import { CostprocessComponent } from './costprocess/costprocess.component';
import {DerpPipe} from './pipederp.pipe'

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);

import {ChartModule} from 'primeng/chart'


@NgModule({
    imports: [
        CommonModule,
        DetailnewsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DataTablesModule,
        FusionChartsModule,
        ChartModule

    ],
    declarations: [
        DetailnewsComponent,
        DerpPipe
    ]
})

export class DetailnewsModule {}