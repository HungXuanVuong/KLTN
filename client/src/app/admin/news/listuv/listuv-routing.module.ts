import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListuvComponent } from './listuv.component';
const routes: Routes = [
    { 
        path: '', component: ListuvComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListuvRoutingModule {}