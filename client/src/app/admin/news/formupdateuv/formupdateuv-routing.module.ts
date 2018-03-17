import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormupdateuvComponent } from './formupdateuv.component';
const routes: Routes = [
    { 
        path: '', component: FormupdateuvComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormupdateuvRoutingModule {}