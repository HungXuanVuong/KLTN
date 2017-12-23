import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

import { FormchinhsachComponent } from './formchinhsach.component';
const routes: Routes = [
    { 
        path: '', component: FormchinhsachComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormchinhsachRoutingModule {}