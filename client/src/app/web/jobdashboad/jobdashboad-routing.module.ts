import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobdashboadComponent } from './jobdashboad.component';
const routes: Routes = [
    { 
        path: '', component: JobdashboadComponent,
        children: [
             { path: '', redirectTo: 'danggioithieu'},
            { path: 'dagioithieu', loadChildren: './uvdagt/uvdagt.module#UvdagtModule'},
            { path: 'danggioithieu', loadChildren: './uvdanggt/uvdanggt.module#UvdanggtModule'},
            { path: 'trangthaiuv', loadChildren: './trangthaiuv/trangthaiuv.module#TrangthaiuvModule'}
            
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobdashboadRoutingModule {}