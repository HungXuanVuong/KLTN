import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormuserComponent } from './formuser.component';
const routes: Routes = [
    { 
        path: '', component: FormuserComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormuserRoutingModule {}