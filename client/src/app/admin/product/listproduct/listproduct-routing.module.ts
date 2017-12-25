import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListproductComponent } from './listproduct.component';
const routes: Routes = [
    { 
        path: '', component: ListproductComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListproductRoutingModule {}