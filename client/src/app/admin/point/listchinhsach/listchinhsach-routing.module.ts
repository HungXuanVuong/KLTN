import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListchinhsachComponent } from './listchinhsach.component';
const routes: Routes = [
    { 
        path: '', component: ListchinhsachComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListchinhsachRoutingModule {}