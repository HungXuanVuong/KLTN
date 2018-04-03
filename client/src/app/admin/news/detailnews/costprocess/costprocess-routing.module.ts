import { CostprocessComponent } from './costprocess.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

const routes: Routes = [
    { 
        path: '', component: CostprocessComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CostprocessRoutingModule {}