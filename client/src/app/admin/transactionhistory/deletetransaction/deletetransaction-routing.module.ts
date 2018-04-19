import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { DeletetransactionComponent } from './deletetransaction.component';
const routes: Routes = [
    { 
        path: '', component: DeletetransactionComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeletetransactionRoutingModule {}