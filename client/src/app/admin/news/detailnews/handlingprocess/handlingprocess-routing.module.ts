import { HandlingprocessComponent } from './handlingprocess.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

const routes: Routes = [
    { 
        path: '', component: HandlingprocessComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HandlingprocessRoutingModule {}