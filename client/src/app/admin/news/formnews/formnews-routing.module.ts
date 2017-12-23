import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormnewsComponent } from './formnews.component';
const routes: Routes = [
    { 
        path: '', component: FormnewsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormnewsRoutingModule {}