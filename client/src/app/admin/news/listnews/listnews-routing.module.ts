import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListnewsComponent } from './listnews.component';
const routes: Routes = [
    { 
        path: '', component: ListnewsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListnewsRoutingModule {}