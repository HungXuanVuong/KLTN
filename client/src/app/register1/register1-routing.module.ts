import { Register1Component } from './register1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

const routes: Routes = [
    { 
        path: '', component: Register1Component,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Register1RoutingModule {}