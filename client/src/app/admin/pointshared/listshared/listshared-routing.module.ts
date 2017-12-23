import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListsharedComponent } from './listshared.component';
const routes: Routes = [
    { 
        path: '', component: ListsharedComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListsharedRoutingModule {}