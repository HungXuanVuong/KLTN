import { CommonModule } from '@angular/common';
import { DetailnewsComponent } from './detailnews.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
const routes: Routes = [
    { 
        path: '', component: DetailnewsComponent,
        // children: [
        //     { path: '', redirectTo: 'thongtinchung'},
        //    { path: 'thongtinchung', loadChildren: './commonnews/commonnews.module#CommonnewsModule'},
        //    { path: 'xuli', loadChildren: './handlingprocess/handlingprocess.module#HandlingprocessModule'},
        //    { path: 'chiphixuli', loadChildren: './costprocess/costprocess.module#CostprocessModule'}
        // ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailnewsRoutingModule {}